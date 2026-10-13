const main = (container) => {
  const margin = { top: 40, right: 40, bottom: 60, left: 150 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  d3.select(container).select('svg').style('background', '#f9f9fc');

  d3.csv('./us-cities.csv', (row) => ({
    place: row.place,
    population: Number(row.population)
  })).then((data) => {
    
    const dataset = data
      .sort((a, b) => b.population - a.population)
      .slice(0, 15);

    
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => d.population)]) 
      .nice()
      .range([0, width]); 

    const yScale = d3.scalePoint()
      .domain(dataset.map(d => d.place)) 
      .range([0, height]) 
      .padding(0.5); 

    
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale)
              .ticks(8)
              .tickFormat(d3.format('.2s'))) 
      .attr('font-size', '12px');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .text('Population');

    svg.append('g')
      .call(d3.axisLeft(yScale))
      .attr('font-size', '12px')
      .selectAll('text')
      .attr('fill', '#333'); 

    svg.selectAll('line.grid')
      .data(dataset)
      .join('line')
      .attr('class', 'grid')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', d => yScale(d.place))
      .attr('y2', d => yScale(d.place))
      .attr('stroke', '#e0e0e0')
      .attr('stroke-dasharray', '3,3'); 

   
    svg.selectAll('.dot')
      .data(dataset)
      .join('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.population)) 
      .attr('cy', d => yScale(d.place))      
      .attr('r', 8)
      .attr('fill', '#ff6347')
      .attr('stroke', '#cc4f39')
      .attr('stroke-width', 1.5);

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text('Population des 15 plus grandes villes US');

  }).catch((error) => {
    console.error('Erreur lors du chargement des données:', error);
  });
}

const container = document.getElementById('container');
main(container);