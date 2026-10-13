const main = (container) => {
  // 1. Définir des marges suffisantes pour les axes (comme dans index4.js)
  const margin = { top: 40, right: 40, bottom: 60, left: 150 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // 2. Créer le conteneur SVG principal avec le groupe <g> décalé
  const svg = d3.select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Fond d'écran clair optionnel
  d3.select(container).select('svg').style('background', '#f9f9fc');

  // 3. Lire les données
  d3.csv('./us-cities.csv', (row) => ({
    place: row.place,
    population: Number(row.population)
  })).then((data) => {
    
    // 4. Trier par population décroissante et garder le Top 15 (pour que les barres ne soient pas trop écrasées)
    const dataset = data
      .sort((a, b) => b.population - a.population)
      .slice(0, 15);

    // 5. Échelle X pour la largeur des barres (Population)
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => d.population)])
      .nice()
      .range([0, width]);

    // 6. Échelle Y (Bandes) pour répartir les noms de villes de haut en bas
    const yScale = d3.scaleBand()
      .domain(dataset.map(d => d.place))
      .range([0, height])
      .padding(0.2); // Espace de 20% entre chaque barre

    // 7. Ajouter l'axe X (Population en bas)
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale)
              .ticks(8)
              .tickFormat(d3.format('.2s'))) // Format lisible, ex: 8M
      .attr('font-size', '12px');

    // Label de l'axe X
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .text('Population');

    // 8. Ajouter l'axe Y (Villes à gauche)
    svg.append('g')
      .call(d3.axisLeft(yScale))
      .attr('font-size', '12px')
      .selectAll('text')
      .attr('fill', '#333');

    // 9. Dessiner les barres rectangulaires horizontales
    svg.selectAll('.bar')
      .data(dataset)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', 0) // La barre commence collée à l'axe Y (0)
      .attr('y', d => yScale(d.place)) // Positionnée selon la ville
      .attr('width', d => xScale(d.population)) // La longueur dépend de la population
      .attr('height', yScale.bandwidth()) // L'épaisseur de la barre calculée par scaleBand
      .attr('fill', '#287c7a'); // Couleur verte

    // THE .valuelabel BLOCK WAS REMOVED HERE 

    // 10. Titre principal
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text('US Cities by Population (Top 15)');

  }).catch((error) => {
    console.error('Could not load us-cities.csv:', error);
    d3.select(container).text('Could not load us-cities.csv.');
  });
}

const container = document.getElementById('container');
main(container);