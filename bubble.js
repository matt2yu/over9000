const file = 'data.json';
const width = window.innerWidth;
const height = window.innerHeight;
const colors = {
    Naruto: '#1C88C7',
    MyHeroAcademia: '#FFD700',
    DragonBallZ: '#FFA500',
    OnePunchMan: '#228B22',
    HunterxHunter: '#9370D8'
};

const logos = {
    Naruto: 'url(#Naruto)',
    MyHeroAcademia: 'url(#MHA)',
    DragonBallZ: 'url(#DBZ)',
    OnePunchMan: 'url(#OPM)',
    HunterxHunter: 'url(#HXH)'
};


const generateChart = data => {
    const bubble = data => d3.pack()
        .size([width, height])
        .padding(12)(d3.hierarchy({ children: data }).sum(d => d.score));

    const svg = d3.select('#bubble-chart')
        .style('width', width)
        .style('height', height);

    // const defs = svg.append("defs");   
    // defs.append("pattern")
    //     .attr("id", "OPM")
    //     .attr("height", "100%")
    //     .attr("width", "100%")
    //     .attr("patternContentUnits", "objectBoundingBox")
    //     .append("image")
    //     .attr("height", 1)
    //     .attr("width", 1)
    //     .attr("preserveAspectRatio", "none")
    //     .attr("xlink:href", "./assets/images/OPM.jpg")
  
    const root = bubble(data);
    const tooltip = d3.select('.tooltip');

    const groupButton = d3.select("anime-group").on('click', function() {
        console.log("You clicked")
    })

    const node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
        
    
    const circle = node.append('circle')
        // .style('')
        .style('fill', d => colors[d.data.category])
        .on('mouseover', function (e, d) {
            tooltip.select('img').attr('src', d.data.img);
            tooltip.select('a').attr('href', d.data.link).text(d.data.name);
            tooltip.select('span').attr('class', d.data.category).text(d.data.category);
            tooltip.style('visibility', 'visible');
            d3.select(this).style('stroke', 'black');
            d3.select(this).style('fill', 'url(#power-scout)');
        })
        .on('mousemove', e => tooltip.style('top', `${e.pageY}px`)
            .style('left', `${e.pageX + 10}px`))
        .on('mouseout', function (e, d) {
            d3.select(this).style('stroke', 'none');
            d3.select(this).style('color', 'white');
            d3.select(this).style('fill', d => logos[d.data.category]);
            d3.select(this).select('text').style('fill', 'white');




            return tooltip.style('visibility', 'hidden');
        })
        .on('click', (e, d) => window.open(d.data.link))
       
    const label = node.append('text')
        .attr('dy', 2)
        .text(d => d.data.name.substring(0, d.r / 3))
        .style('stroke', 'black')
        .style('stroke-width', '3px')
        .style('stroke-opacity', '0.65')
        .style('font-weight', '600')
        .style('font-family', 'Inter')
        .style('fill', 'white')
        .style('paint-order', 'stroke')
        .style('text-overflow', 'ellipsis')
        .on('mouseout', function (e, d) {
            d3.select(this).style('visibility', 'hidden');

        })
       
        



  
        
    node.transition()
        .delay(3000)
        .ease(d3.easeExpInOut)
        .duration(3000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    
    circle.transition()
        .delay(3000)
        .ease(d3.easeExpInOut)
        .duration(3000)
        .attr('r', d => d.r);
    
    label.transition()
        .delay(5200)
        .ease(d3.easeExpInOut)
        .duration(3000)
        .style('opacity', 4)
};



(async () => {
    data = await d3.json(file).then(data => data);
    generateChart(data);
})();