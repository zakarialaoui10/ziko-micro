	reload=()=>{
	location.reload();
	document.getElementsByClassName("canvasjs-chart-toolbar")[0].style.display="none";
    document.getElementsByClassName("canvasjs-chart-tooltip")[0].style.display="none";
    document.getElementsByClassName("canvasjs-chart-credit")[0].style.display="none";
}
//document.getElementById("reload").click();
	var data=[{
		type: "column",
		dataPoints: []
	}];
	var title={text:""};
	var axisX={
		title:"",
		lineColor: "#4F81BC",
		tickColor: "#4F81BC",
		labelFontColor: "#4F81BC"
	};
	var axisY={
		title:"",
		lineColor: "#4F81BC",
		tickColor: "#4F81BC",
		labelFontColor: "#4F81BC"
	};
var chart = new CanvasJS.Chart("chartContainer", {
	title:title,
	axisY:axisY,
	axisX:axisX,

	axisY2: {
		title: "Percent",
		suffix: "%",
		lineColor: "#C0504E",
		tickColor: "#C0504E",
		labelFontColor: "#C0504E"
	},
	data:data 
});
//chart.render();
//pareto();	
document.getElementById("valider").addEventListener("click",createDataInput);
	var inputData=[];
	var inputLabel=[];
function createDataInput(){
	let n=document.getElementById('datalength').value;
	title.text=document.getElementById('title').value;
	axisX.title=document.getElementById('xlabel').value;
	axisY.title=document.getElementById('ylabel').value;

	var Dataids=[];
	var Labelids=[];
	inputData=new Array(n);
	inputLabel=new Array(n);
	for(i=0;i<n;i++){
		Dataids[i]="input"+(+i+1);
		Labelids[i]="label"+(+i+1);
		inputData[i]=document.createElement("input");
		inputLabel[i]=document.createElement("input");
		inputData[i].setAttribute("id",Dataids[i]);
		inputLabel[i].setAttribute("id",Labelids[i]);
		inputData[i].setAttribute("class","inputData");
		inputLabel[i].setAttribute("class","inputLabel");
		inputData[i].setAttribute("placeholder","item "+(+i+1));
		inputLabel[i].setAttribute("placeholder","label "+(+i+1));
		document.getElementById("ui2").appendChild(inputData[i]);
		document.getElementById("ui2").appendChild(inputLabel[i]);
		document.getElementById("ui2").appendChild(document.createElement("br"));
	}
	document.getElementById("ui1").remove();
	var btn=document.createElement("button");
	btn.innerHTML='<i class="fas fa-angle-double-right"></i>'
	document.getElementById("ui").appendChild(btn);
	btn.addEventListener("click",getData);
	console.log([inputData,inputLabel])
	//return [inputData,inputLabel]	
}
function getData(){
	let d=[]
	inputData=inputData.map((n)=>+n.value);
    inputLabel=inputLabel.map((n)=>n.value);
        console.log([inputData,inputLabel])
    for(i=0;i<inputData.length;i++){
     d[i]={y:inputData[i],label:inputLabel[i]}
    }
    d.sort((a,b)=>b.y-a.y);

    data[0].dataPoints.push(...d)
    chart.render();
    document.getElementsByClassName("canvasjs-chart-toolbar")[0].remove();
    document.getElementsByClassName("canvasjs-chart-tooltip")[0].remove();
    document.getElementsByClassName("canvasjs-chart-credit")[0].remove();

    pareto();
    document.getElementById("ui").remove()
let canvas=document.getElementsByClassName("canvasjs-chart-canvas")[0]
    let link = document.createElement('a');
      link.innerHTML='<i class="fas fa-save"></i>';
      link.href = canvas.toDataURL("image/png");
      link.download = title.text+".png";
      let button=document.createElement("button");
      button.appendChild(link);
      document.getElementById("coordonne").appendChild(button)
    //console.log(img)

}
function pareto(){
	var dps = [];
	var yValue, yTotal = 0, yPercent = 0;

	for(var i = 0; i < chart.data[0].dataPoints.length; i++)
		yTotal += chart.data[0].dataPoints[i].y;

	for(var i = 0; i < chart.data[0].dataPoints.length; i++){
		yValue = chart.data[0].dataPoints[i].y;
		yPercent += (yValue / yTotal * 100);
		dps.push({label: chart.data[0].dataPoints[i].label, y: yPercent});
	}
	
	chart.addTo("data",{type:"line", yValueFormatString: "0.##\"%\"", dataPoints: dps});
	chart.data[1].set("axisYType", "secondary", false);
	chart.axisY[0].set("maximum", yTotal);
	chart.axisY2[0].set("maximum", 100);
}
