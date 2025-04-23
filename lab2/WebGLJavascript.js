let canvas = document.getElementById('my_Canvas');
let gl = canvas.getContext('webgl');

const cubeVertices = [
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

const cubeColors = [
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

const pyramidVertices = [
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

const pyramidColors = [
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

let matrixStack = [];
function pushMatrix(m) {
   matrixStack.push(mat4.clone(m));
}
function popMatrix() {
   if (matrixStack.length === 0) {
       throw "Ошибка: Стек матриц пуст.";
   }
   return matrixStack.pop();
}
let modelViewMatrix = mat4.create();
let projectionMatrix = mat4.create();
let normalMatrix = mat4.create();

function createBuffer(data) {
   let buffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
   return buffer;
}

let cubeBuffer = createBuffer(cubeVertices);
let pyramidBuffer = createBuffer(pyramidVertices);

let cubeColorBuffer = createBuffer(cubeColors);
let pyramidColorBuffer = createBuffer(pyramidColors);

const vertCode = `
   attribute vec3 coordinates;
   attribute vec3 color;
   varying vec3 vColor;
   varying vec3 vPosition;

   uniform mat4 modelViewMatrix;
   uniform mat4 projectionMatrix;
   uniform mat4 normalMatrix;

   void main(void) {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(coordinates, 1.0);
      vColor = color;
      vPosition = coordinates;
   }
`;

let vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

const fragCode = `
   precision mediump float;
   varying vec3 vColor;
   varying vec3 vPosition;
   void main(void) {
      float gradient = vPosition.z + 0.9;
      gl_FragColor = vec4(vColor * gradient, 1.0);
   }
`;

let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

let shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

let coordLocation = gl.getAttribLocation(shaderProgram, "coordinates");
gl.enableVertexAttribArray(coordLocation);
let colorLocation = gl.getAttribLocation(shaderProgram, "color");
gl.enableVertexAttribArray(colorLocation);

let modelViewMatrixLocation = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
let projectionMatrixLocation = gl.getUniformLocation(shaderProgram, "projectionMatrix");
let normalMatrixLocation = gl.getUniformLocation(shaderProgram, "normalMatrix");

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

function updateProjection() {
   let aspect = canvas.width / canvas.height;
   let projectionType = document.getElementById('projectionType').value;

   let perspectiveControls = document.querySelector('.perspective-controls');
   perspectiveControls.style.display = (projectionType === 'perspective') ? 'block' : 'none';

   mat4.identity(projectionMatrix);
   
   if (projectionType === 'perspective') {
      let fov = parseFloat(document.getElementById('fov').value) * Math.PI / 180;
      let near = parseFloat(document.getElementById('near').value);
      let far = parseFloat(document.getElementById('far').value);
      mat4.perspective(projectionMatrix, fov, aspect, near, far);
   } else {
      let distance = parseFloat(document.getElementById('eyeZ').value);
      mat4.ortho(projectionMatrix, -aspect * distance / 2, aspect * distance / 2, -distance / 2, distance / 2, 0.1, 100.0);
   }
   
   gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
}

function updateView() {
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   gl.viewport(0, 0, canvas.width, canvas.height);
    
   updateProjection();
    
   let eye = [
      parseFloat(document.getElementById('eyeX').value),
      parseFloat(document.getElementById('eyeY').value),
      parseFloat(document.getElementById('eyeZ').value)
   ];
  
   let center = [
      parseFloat(document.getElementById('centerX').value),
      parseFloat(document.getElementById('centerY').value),
      parseFloat(document.getElementById('centerZ').value)
   ];
  
   let up = [
      parseFloat(document.getElementById('upX').value),
      parseFloat(document.getElementById('upY').value),
      parseFloat(document.getElementById('upZ').value)
   ];
    
   let viewMatrix = mat4.create();
   mat4.lookAt(viewMatrix, eye, center, up);
    
   mat4.identity(modelViewMatrix);
   mat4.copy(modelViewMatrix, viewMatrix);
    
   pushMatrix(modelViewMatrix);
   
   let xPosCube = parseFloat(document.getElementById('xPosCube').value);
   let yPosCube = parseFloat(document.getElementById('yPosCube').value);
   let zPosCube = parseFloat(document.getElementById('zPosCube').value);
   let xScaleCube = parseFloat(document.getElementById('xScaleCube').value);
   let yScaleCube = parseFloat(document.getElementById('yScaleCube').value);
   let xRotateCube = parseFloat(document.getElementById('xRotateCube').value) * Math.PI / 180;
   let yRotateCube = parseFloat(document.getElementById('yRotateCube').value) * Math.PI / 180;
   let zRotateCube = parseFloat(document.getElementById('zRotateCube').value) * Math.PI / 180;

   mat4.translate(modelViewMatrix, modelViewMatrix, [xPosCube, yPosCube, zPosCube]);
   mat4.rotateX(modelViewMatrix, modelViewMatrix, xRotateCube);
   mat4.rotateY(modelViewMatrix, modelViewMatrix, yRotateCube);
   mat4.rotateZ(modelViewMatrix, modelViewMatrix, zRotateCube);
   mat4.scale(modelViewMatrix, modelViewMatrix, [xScaleCube, yScaleCube, 1]);
   
   mat4.copy(normalMatrix, modelViewMatrix);
   mat4.invert(normalMatrix, normalMatrix);
   mat4.transpose(normalMatrix, normalMatrix);
   
   gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);
   gl.uniformMatrix4fv(normalMatrixLocation, false, normalMatrix);
   
   drawCube(cubeBuffer, cubeColorBuffer, cubeVertices.length / 3);
   
   modelViewMatrix = popMatrix();
   
   let xPosPyramid = parseFloat(document.getElementById('xPosPyramid').value);
   let yPosPyramid = parseFloat(document.getElementById('yPosPyramid').value);
   let zPosPyramid = parseFloat(document.getElementById('zPosPyramid').value);
   let xScalePyramid = parseFloat(document.getElementById('xScalePyramid').value);
   let yScalePyramid = parseFloat(document.getElementById('yScalePyramid').value);
   let xRotatePyramid = parseFloat(document.getElementById('xRotatePyramid').value) * Math.PI / 180;
   let yRotatePyramid = parseFloat(document.getElementById('yRotatePyramid').value) * Math.PI / 180;
   let zRotatePyramid = parseFloat(document.getElementById('zRotatePyramid').value) * Math.PI / 180;

   mat4.translate(modelViewMatrix, modelViewMatrix, [xPosPyramid, yPosPyramid, zPosPyramid]);
   mat4.rotateX(modelViewMatrix, modelViewMatrix, xRotatePyramid);
   mat4.rotateY(modelViewMatrix, modelViewMatrix, yRotatePyramid);
   mat4.rotateZ(modelViewMatrix, modelViewMatrix, zRotatePyramid);
   mat4.scale(modelViewMatrix, modelViewMatrix, [xScalePyramid, yScalePyramid, 1]);
   
   mat4.copy(normalMatrix, modelViewMatrix);
   mat4.invert(normalMatrix, normalMatrix);
   mat4.transpose(normalMatrix, normalMatrix);
   
   gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);
   gl.uniformMatrix4fv(normalMatrixLocation, false, normalMatrix);
   
   drawPyramid(pyramidBuffer, pyramidColorBuffer, pyramidVertices.length / 3);
}


document.getElementById('projectionType').addEventListener('change', updateView);
document.querySelectorAll('input').forEach(input => {
   input.addEventListener('input', updateView);
});

updateView();