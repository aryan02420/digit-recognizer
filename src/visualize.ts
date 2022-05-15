import * as d3 from 'd3'

export function displayPredictions(prediction: number[]) {
  const selection = d3.select('#d3')
  const svg = selection.selectAll('svg').data([null])
  const svgEnter = svg.enter().append('svg')
  svg.exit().remove()
  svg.merge(svgEnter).attr('viewBox', '0 0 150 210').attr('width', 300)

  svg
    .selectAll('rect')
    .data([null])
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', 210)
    .attr('width', 150)
    .attr('fill', 'transparent')

  const rowGroup = svg.selectAll('g').data(prediction)
  const rowGroupEnter = rowGroup
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${20 + i * 20})`)
  rowGroup.exit().remove()

  rowGroupEnter.append('text').attr('x', 10)
  rowGroupEnter
    .append('rect')
    .attr('x', 25)
    .attr('y', -13)
    .attr('height', 16)
    .attr('rx', 1)
  rowGroup
    .merge(rowGroupEnter)
    .select('text')
    .text((d, i) => i)
  rowGroup
    .merge(rowGroupEnter)
    .select('rect')
    .transition()
    .attr('width', (d) => 112 * d + 0.0001)
}
