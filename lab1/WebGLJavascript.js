var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('webgl');

var cubeVertices = [
   // зад
   -0.33, -0.33, -0.33,  0.33, -0.33, -0.33,  0.33, 0.33, -0.33,
   -0.33, -0.33, -0.33,  0.33, 0.33, -0.33,  -0.33, 0.33, -0.33,

   // перед  
   -0.33, -0.33, 0.33,  0.33, -0.33, 0.33,  0.33, 0.33, 0.33,
   -0.33, -0.33, 0.33,  0.33, 0.33, 0.33,  -0.33, 0.33, 0.33,

   // лево
   -0.33, -0.33, -0.33,  -0.33, 0.33, -0.33,  -0.33, 0.33, 0.33,
   -0.33, -0.33, -0.33,  -0.33, 0.33, 0.33,  -0.33, -0.33, 0.33,

   // право
   0.33, -0.33, -0.33,  0.33, 0.33, -0.33,  0.33, 0.33, 0.33,
   0.33, -0.33, -0.33,  0.33, 0.33, 0.33,  0.33, -0.33, 0.33,

   // низ
   -0.33, -0.33, -0.33,  0.33, -0.33, -0.33,  0.33, -0.33, 0.33,
   -0.33, -0.33, -0.33,  0.33, -0.33, 0.33,  -0.33, -0.33, 0.33,

   // верх
   -0.33, 0.33, -0.33,  0.33, 0.33, -0.33,  0.33, 0.33, 0.33,
   -0.33, 0.33, -0.33,  0.33, 0.33, 0.33,  -0.33, 0.33, 0.33
];

var cubeColors = [
   // зад (красный)
   1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,
   1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,

   // перед (зелёный)
   0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,
   0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,

   // лево (синий)
   0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,
   0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,

   // право (жёлтый)
   1.0, 1.0, 0.0,  1.0, 1.0, 0.0,  1.0, 1.0, 0.0,
   1.0, 1.0, 0.0,  1.0, 1.0, 0.0,  1.0, 1.0, 0.0,

   // низ (пурпурный)
   1.0, 0.0, 1.0,  1.0, 0.0, 1.0,  1.0, 0.0, 1.0,
   1.0, 0.0, 1.0,  1.0, 0.0, 1.0,  1.0, 0.0, 1.0,

   // верх (голубой)
   0.0, 1.0, 1.0,  0.0, 1.0, 1.0,  0.0, 1.0, 1.0,
   0.0, 1.0, 1.0,  0.0, 1.0, 1.0,  0.0, 1.0, 1.0
];

var pyramidVertices = [
   // Основание (квадратное)
   -0.45, 0.0, -0.45,  0.45, 0.0, -0.45,  0.45, 0.0, 0.45,  -0.45, 0.0, 0.45,

   // Боковые грани
   // перед
   0.0, 0.9, 0.0,  -0.45, 0.0, -0.45,  0.45, 0.0, -0.45,  
   // право
   0.0, 0.9, 0.0,   0.45, 0.0, -0.45,  0.45, 0.0, 0.45, 
   // зад  
   0.0, 0.9, 0.0,   0.45, 0.0, 0.45,  -0.45, 0.0, 0.45,   
   // лево
   0.0, 0.9, 0.0,  -0.45, 0.0, 0.45,  -0.45, 0.0, -0.45   
];

var pyramidColors = [
   // Основание (оранжевый)
   1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.5, 0.0,

   // Боковые грани
   // перед (зелёный)
   0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  
   // право (красный)
   1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,
   // зад (синий)  
   0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  
   // лево (жёлтый)
   1.0, 1.0, 0.0,  1.0, 1.0, 0.0,  1.0, 1.0, 0.0   
];

function createBuffer(data) {
   var buffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
   return buffer;
}

var cubeBuffer = createBuffer(cubeVertices);
var pyramidBuffer = createBuffer(pyramidVertices);

var cubeColorBuffer = createBuffer(cubeColors);
var pyramidColorBuffer = createBuffer(pyramidColors);

var vertCode = `
   attribute vec3 coordinates;
   attribute vec3 color;
   varying vec3 vColor;
   varying vec3 vPosition;
   uniform mat4 modelMatrix;
   void main(void) {
      gl_Position = modelMatrix * vec4(coordinates, 1.0);
      vColor = color;
      vPosition = coordinates;
   }
`;

var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

var fragCode = `
   precision mediump float;
   varying vec3 vColor;
   varying vec3 vPosition;
   void main(void) {
      float gradient = vPosition.z + 0.9;
      gl_FragColor = vec4(vColor * gradient, 1.0);
   }
`;

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

var coordLocation = gl.getAttribLocation(shaderProgram, "coordinates");
gl.enableVertexAttribArray(coordLocation);
var colorLocation = gl.getAttribLocation(shaderProgram, "color");
gl.enableVertexAttribArray(colorLocation);

var cubeModelMatrix = mat4.create();
mat4.identity(cubeModelMatrix);
var cubeModelMatrixLocation = gl.getUniformLocation(shaderProgram, "modelMatrix");

var pyramidModelMatrix = mat4.create();
mat4.identity(pyramidModelMatrix);
var pyramidModelMatrixLocation = gl.getUniformLocation(shaderProgram, "modelMatrix");

function drawCube(vertexBuffer, colorBuffer, vertexCount) {
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   gl.vertexAttribPointer(coordLocation, 3, gl.FLOAT, false, 0, 0);

   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
   gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

   gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
}

function drawPyramid(vertexBuffer, colorBuffer, vertexCount) {
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   gl.vertexAttribPointer(coordLocation, 3, gl.FLOAT, false, 0, 0);

   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
   gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

   gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
   gl.drawArrays(gl.TRIANGLES, 4, vertexCount - 4);
}

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.viewport(0, 0, canvas.width, canvas.height);

function updateView() {
   const xPosCube = parseFloat(document.getElementById('xPosCube').value);
   const yPosCube = parseFloat(document.getElementById('yPosCube').value);
   const zPosCube = parseFloat(document.getElementById('zPosCube').value);
   const xScaleCube = parseFloat(document.getElementById('xScaleCube').value);
   const yScaleCube = parseFloat(document.getElementById('yScaleCube').value);
   const xRotateCube = parseFloat(document.getElementById('xRotateCube').value) * Math.PI / 180;
   const yRotateCube = parseFloat(document.getElementById('yRotateCube').value) * Math.PI / 180;
   const zRotateCube = parseFloat(document.getElementById('zRotateCube').value) * Math.PI / 180;

   mat4.identity(cubeModelMatrix);
   mat4.translate(cubeModelMatrix, cubeModelMatrix, [xPosCube, yPosCube, zPosCube]);
   mat4.rotateX(cubeModelMatrix, cubeModelMatrix, xRotateCube);
   mat4.rotateY(cubeModelMatrix, cubeModelMatrix, yRotateCube);
   mat4.rotateZ(cubeModelMatrix, cubeModelMatrix, zRotateCube);
   mat4.scale(cubeModelMatrix, cubeModelMatrix, [xScaleCube, yScaleCube, 1]);

   const xPosPyramid = parseFloat(document.getElementById('xPosPyramid').value);
   const yPosPyramid = parseFloat(document.getElementById('yPosPyramid').value);
   const zPosPyramid = parseFloat(document.getElementById('zPosPyramid').value);
   const xScalePyramid = parseFloat(document.getElementById('xScalePyramid').value);
   const yScalePyramid = parseFloat(document.getElementById('yScalePyramid').value);
   const xRotatePyramid = parseFloat(document.getElementById('xRotatePyramid').value) * Math.PI / 180;
   const yRotatePyramid = parseFloat(document.getElementById('yRotatePyramid').value) * Math.PI / 180;
   const zRotatePyramid = parseFloat(document.getElementById('zRotatePyramid').value) * Math.PI / 180;

   mat4.identity(pyramidModelMatrix);
   mat4.translate(pyramidModelMatrix, pyramidModelMatrix, [xPosPyramid, yPosPyramid, zPosPyramid]);
   mat4.rotateX(pyramidModelMatrix, pyramidModelMatrix, xRotatePyramid);
   mat4.rotateY(pyramidModelMatrix, pyramidModelMatrix, yRotatePyramid);
   mat4.rotateZ(pyramidModelMatrix, pyramidModelMatrix, zRotatePyramid);
   mat4.scale(pyramidModelMatrix, pyramidModelMatrix, [xScalePyramid, yScalePyramid, 1]);

   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   gl.uniformMatrix4fv(cubeModelMatrixLocation, false, cubeModelMatrix);
   drawCube(cubeBuffer, cubeColorBuffer, cubeVertices.length / 3);

   gl.uniformMatrix4fv(pyramidModelMatrixLocation, false, pyramidModelMatrix);
   drawPyramid(pyramidBuffer, pyramidColorBuffer, pyramidVertices.length / 3);
}

document.getElementById('xPosCube').addEventListener('input', updateView);
document.getElementById('yPosCube').addEventListener('input', updateView);
document.getElementById('zPosCube').addEventListener('input', updateView);
document.getElementById('xScaleCube').addEventListener('input', updateView);
document.getElementById('yScaleCube').addEventListener('input', updateView);
document.getElementById('xRotateCube').addEventListener('input', updateView);
document.getElementById('yRotateCube').addEventListener('input', updateView);
document.getElementById('zRotateCube').addEventListener('input', updateView);

document.getElementById('xPosPyramid').addEventListener('input', updateView);
document.getElementById('yPosPyramid').addEventListener('input', updateView);
document.getElementById('zPosPyramid').addEventListener('input', updateView);
document.getElementById('xScalePyramid').addEventListener('input', updateView);
document.getElementById('yScalePyramid').addEventListener('input', updateView);
document.getElementById('xRotatePyramid').addEventListener('input', updateView);
document.getElementById('yRotatePyramid').addEventListener('input', updateView);
document.getElementById('zRotatePyramid').addEventListener('input', updateView);

updateView();