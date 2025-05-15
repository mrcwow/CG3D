let canvas = document.getElementById('my_Canvas');
let gl = canvas.getContext('webgl2');

const cubeVertices = [
   // зад (красный)
   -0.33, -0.33, -0.33,  0.33,  0.33, -0.33, 0.33, -0.33, -0.33,  
   -0.33, -0.33, -0.33,  -0.33,  0.33, -0.33, 0.33,  0.33, -0.33, 

   // перед (зеленый)
   -0.33, -0.33, 0.33,  0.33, -0.33, 0.33,  0.33, 0.33, 0.33,
   -0.33, -0.33, 0.33,  0.33, 0.33, 0.33,  -0.33, 0.33, 0.33,

   // лево (синий)
   -0.33, -0.33, -0.33,  -0.33,  0.33,  0.33,  -0.33,  0.33, -0.33,
   -0.33, -0.33, -0.33,  -0.33, -0.33,  0.33,  -0.33,  0.33,  0.33,

   // право (жёлтый)
   0.33, -0.33, -0.33,   0.33,  0.33, -0.33,   0.33,  0.33,  0.33,
   0.33, -0.33, -0.33,   0.33,  0.33,  0.33,   0.33, -0.33,  0.33,

   // низ (пурпурный)
   -0.33, -0.33, -0.33,   0.33, -0.33, -0.33,   0.33, -0.33,  0.33,
   -0.33, -0.33, -0.33,   0.33, -0.33,  0.33,  -0.33, -0.33,  0.33,

   // верх (голубой)
   -0.33,  0.33, -0.33,   0.33,  0.33,  0.33,   0.33,  0.33, -0.33,
   -0.33,  0.33, -0.33,  -0.33,  0.33,  0.33,   0.33,  0.33,  0.33
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

const cubeTexCoords = [
   // зад (красный)
   1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
   1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

   // перед (зелёный)
   0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
   0.0, 0.0, 1.0, 1.0, 0.0, 1.0,

   // лево (синий)
   0.0, 0.0, 1.0, 1.0, 0.0, 1.0,
   0.0, 0.0, 1.0, 0.0, 1.0, 1.0,

   // право (жёлтый)
   1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
   1.0, 0.0, 0.0, 1.0, 0.0, 0.0,

   // низ (пурпурный)
   0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
   0.0, 0.0, 1.0, 1.0, 0.0, 1.0,

   // верх (голубой)
   0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
   0.0, 1.0, 0.0, 0.0, 1.0, 0.0
];

const pyramidVertices = [
   // Основание (оранжевый)
   -0.45, 0.0, -0.45,  0.45, 0.0, -0.45,  0.45, 0.0, 0.45,
   -0.45, 0.0, -0.45,  0.45, 0.0, 0.45,  -0.45, 0.0, 0.45,
   
   // Боковые грани
   // перед (зелёный)
   0.0, 0.9, 0.0,  0.45, 0.0, -0.45, -0.45, 0.0, -0.45,  
   // право (красный)
   0.0, 0.9, 0.0,  0.45, 0.0, 0.45, 0.45, 0.0, -0.45,  
   // зад (синий)
   0.0, 0.9, 0.0,  -0.45, 0.0, 0.45, 0.45, 0.0, 0.45,  
   // лево (жёлтый)
   0.0, 0.9, 0.0,  -0.45, 0.0, -0.45, -0.45, 0.0, 0.45  
];

const pyramidColors = [
   // Основание (оранжевый)
   1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.5, 0.0,
   1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.5, 0.0,

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

const pyramidTexCoords = [
   // Основание (оранжевый)
   0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
   0.0, 0.0, 1.0, 1.0, 0.0, 1.0,

   // Боковые грани
   // перед (зелёный)
   0.5, 1.0, 0.0, 0.0, 1.0, 0.0,
   // право (красный)
   0.5, 1.0, 0.0, 0.0, 1.0, 0.0,
   // зад (синий)  
   0.5, 1.0, 0.0, 0.0, 1.0, 0.0,
   // лево (жёлтый)
   0.5, 1.0, 0.0, 0.0, 1.0, 0.0,
];

function makeFlatNormals(vertices, start, num, normals) {
   if (num % 9 !== 0) {
      console.warn("Warning: number of floats is not a multiple of 9");
      return;
   }

   for (let i = start; i < start + num; i += 9) {
      const p0 = vec3.fromValues(vertices[i],   vertices[i+1], vertices[i+2]);
      const p1 = vec3.fromValues(vertices[i+3], vertices[i+4], vertices[i+5]);
      const p2 = vec3.fromValues(vertices[i+6], vertices[i+7], vertices[i+8]);

      const v1 = vec3.create();
      const v2 = vec3.create();
      const n = vec3.create();

      vec3.subtract(v1, p1, p0);
      vec3.subtract(v2, p2, p0);
      vec3.cross(n, v1, v2);
      vec3.normalize(n, n);

      normals.push(...n, ...n, ...n);
   }
}

const cubeNormals = [];
makeFlatNormals(cubeVertices, 0, cubeVertices.length, cubeNormals);

const pyramidNormals = [];
makeFlatNormals(pyramidVertices, 0, pyramidVertices.length, pyramidNormals);

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

let cubeNormalBuffer = createBuffer(cubeNormals);
let pyramidNormalBuffer = createBuffer(pyramidNormals);

let cubeTexCoordBuffer = createBuffer(cubeTexCoords);
let pyramidTexCoordBuffer = createBuffer(pyramidTexCoords);

function loadTexture(gl, url, width, height, skipPixels = 0, skipRows = 0, scale_min = false) {
   const texture = gl.createTexture();
   gl.bindTexture(gl.TEXTURE_2D, texture);
   
   const image = new Image();
   image.crossOrigin = "Anonymous";
   image.onload = function() {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.pixelStorei(gl.UNPACK_ROW_LENGTH, image.width);
      gl.pixelStorei(gl.UNPACK_SKIP_PIXELS, skipPixels);
      gl.pixelStorei(gl.UNPACK_SKIP_ROWS, skipRows);
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      let scale;
      if (scale_min) {
         scale = Math.min(width / image.width, height / image.height);
      } else {
         scale = Math.max(width / image.width, height / image.height);
      }
      const x = (width - image.width * scale) / 2;
      const y = (height - image.height * scale) / 2;
      
      ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
      
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
      gl.generateMipmap(gl.TEXTURE_2D);
      
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
      gl.pixelStorei(gl.UNPACK_ROW_LENGTH, 0);
      gl.pixelStorei(gl.UNPACK_SKIP_PIXELS, 0);
      gl.pixelStorei(gl.UNPACK_SKIP_ROWS, 0);
   };
   image.src = url;
   return texture;
}

let url = "https://steamuserimages-a.akamaihd.net/ugc/2339126078234824539/86A9178BC8ECD7B6E23007DED91C686A47517D0E/"
let texture128 = loadTexture(gl, url, 128, 128);
let texture256 = loadTexture(gl, url, 256, 256);
let texture512 = loadTexture(gl, url, 512, 512);
let texture128_min = loadTexture(gl, url, 128, 128, 0, 0, true);
let texture256_min = loadTexture(gl, url, 256, 256, 0, 0, true);
let texture512_min = loadTexture(gl, url, 512, 512, 0, 0, true);

const vertCode = `#version 300 es
   precision mediump float;

   in vec3 coordinates;
   in vec3 color;
   in vec3 normal;
   in vec2 texCoord;

   out vec3 vColor;
   out vec3 vPosition;
   out vec3 vNormal;
   out vec3 vLightColorGouraud;
   out vec2 vTexCoord;

   uniform mat4 modelViewMatrix;
   uniform mat4 projectionMatrix;
   uniform mat4 normalMatrix;

   uniform vec3 light1Direction;
   uniform vec3 light2Color;
   uniform vec3 light2Direction;
   uniform vec3 dirLightDirection;
   uniform vec3 dirLightColor;
   uniform vec3 pointLightPosition;
   uniform vec3 pointLightColor;

   uniform bool useGouraudShading;
   uniform bool useTexture;

   uniform vec3 materialAmbient;
   uniform vec3 materialDiffuse;
   uniform vec3 materialSpecular;
   uniform float materialShininess;

   void main(void) {
      vec4 pos = modelViewMatrix * vec4(coordinates, 1.0);
      vColor = color;
      vPosition = pos.xyz;
      vec3 transformedNormal = normalize(mat3(normalMatrix) * normal);
      vNormal = transformedNormal;
      vTexCoord = texCoord;

      if (useGouraudShading) {
         vec3 lightColor = vec3(0.0);
         vec3 viewDir = normalize(-pos.xyz);

         vec3 light1 = normalize(light1Direction);
         float diffuse1 = max(dot(transformedNormal, light1), 0.0);
         vec3 reflect1 = reflect(-light1, transformedNormal);
         float spec1 = pow(max(dot(viewDir, reflect1), 0.0), materialShininess);
         lightColor += materialAmbient +
                        materialDiffuse * diffuse1 +
                        materialSpecular * spec1;

         vec3 light2Dir = normalize(light2Direction);
         float light2Diffuse = max(dot(transformedNormal, light2Dir), 0.0);
         vec3 light2Reflect = reflect(-light2Dir, transformedNormal);
         float light2Spec = pow(max(dot(viewDir, light2Reflect), 0.0), materialShininess);
         lightColor += light2Color * (materialDiffuse * light2Diffuse + materialSpecular * light2Spec);

         vec3 dirDir = normalize(-dirLightDirection);
         float dirDiffuse = max(dot(transformedNormal, dirDir), 0.0);
         vec3 dirReflect = reflect(-dirDir, transformedNormal);
         float dirSpec = pow(max(dot(viewDir, dirReflect), 0.0), materialShininess);
         lightColor += dirLightColor * (materialDiffuse * dirDiffuse + materialSpecular * dirSpec);

         vec3 pointDir = normalize(pointLightPosition - pos.xyz);
         float pointDiffuse = max(dot(transformedNormal, pointDir), 0.0);
         vec3 pointReflect = reflect(-pointDir, transformedNormal);
         float pointSpec = pow(max(dot(viewDir, pointReflect), 0.0), materialShininess);
         float distance = length(pointLightPosition - pos.xyz);
         float attenuation = 1.0 / distance;
         lightColor += pointLightColor * attenuation * (materialDiffuse * pointDiffuse + materialSpecular * pointSpec);

         if (useTexture) {
               vLightColorGouraud = lightColor;
         } else {
               vLightColorGouraud = vColor * lightColor;
         }
      }

      gl_Position = projectionMatrix * pos;
   }
`;

let vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);
if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
   console.error("Vertex Shader Error:\n", gl.getShaderInfoLog(vertShader));
}

const fragCode = `#version 300 es
   precision mediump float;

   in vec3 vColor;
   in vec3 vPosition;
   in vec3 vNormal;
   in vec3 vLightColorGouraud;
   in vec2 vTexCoord;

   out vec4 fragColor;

   uniform vec3 light1Direction; 
   uniform vec3 light2Color;
   uniform vec3 light2Direction;
   uniform vec3 dirLightDirection;
   uniform vec3 dirLightColor;
   uniform vec3 pointLightPosition;
   uniform vec3 pointLightColor;

   uniform vec3 materialAmbient;
   uniform vec3 materialDiffuse;
   uniform vec3 materialSpecular;
   uniform float materialShininess;

   uniform bool useGouraudShading;
   uniform bool useTexture;

   uniform sampler2D uTexture;

   void main(void) {
      if (useGouraudShading) {
         if (useTexture) {
               vec4 texColor = texture(uTexture, vTexCoord);
               fragColor = vec4(texColor.rgb * vLightColorGouraud, 1.0);
         } else {
               fragColor = vec4(vLightColorGouraud, 1.0);
         }
      } else {
         vec3 normal = vNormal;
         vec3 viewDir = normalize(-vPosition);
         vec3 lightColor = vec3(0.0);

         vec3 light1 = normalize(light1Direction);
         float diffuse1 = max(dot(normal, light1), 0.0);
         vec3 reflect1 = reflect(-light1, normal);
         float spec1 = pow(max(dot(viewDir, reflect1), 0.0), materialShininess);
         lightColor += materialAmbient + materialDiffuse * diffuse1 + materialSpecular * spec1;

         vec3 light2Dir = normalize(light2Direction);
         float light2Diffuse = max(dot(normal, light2Dir), 0.0);
         vec3 light2Reflect = reflect(-light2Dir, normal);
         float light2Spec = pow(max(dot(viewDir, light2Reflect), 0.0), materialShininess);
         lightColor += light2Color * (materialDiffuse * light2Diffuse + materialSpecular * light2Spec);

         vec3 dirDir = normalize(-dirLightDirection);
         float dirDiffuse = max(dot(normal, dirDir), 0.0);
         vec3 dirReflect = reflect(-dirDir, normal);
         float dirSpec = pow(max(dot(viewDir, dirReflect), 0.0), materialShininess);
         lightColor += dirLightColor * (materialDiffuse * dirDiffuse + materialSpecular * dirSpec);

         vec3 pointDir = normalize(pointLightPosition - vPosition);
         float pointDiffuse = max(dot(normal, pointDir), 0.0);
         vec3 pointReflect = reflect(-pointDir, normal);
         float pointSpec = pow(max(dot(viewDir, pointReflect), 0.0), materialShininess);
         float distance = length(pointLightPosition - vPosition);
         float attenuation = 1.0 / distance;
         lightColor += pointLightColor * attenuation * (materialDiffuse * pointDiffuse + materialSpecular * pointSpec);

         vec3 finalColor;
         if (useTexture) {
               vec4 texColor = texture(uTexture, vTexCoord);
               finalColor = texColor.rgb * lightColor;
         } else {
               finalColor = vColor * lightColor;
         }
         fragColor = vec4(finalColor, 1.0);
      }
   }
`;

let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);
if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
   console.error("Fragment Shader Error:\n", gl.getShaderInfoLog(fragShader));
}

let shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);
if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
   console.error("Program Link Error:\n", gl.getProgramInfoLog(shaderProgram));
}

let coordLocation = gl.getAttribLocation(shaderProgram, "coordinates");
gl.enableVertexAttribArray(coordLocation);
let colorLocation = gl.getAttribLocation(shaderProgram, "color");
gl.enableVertexAttribArray(colorLocation);
let normalLocation = gl.getAttribLocation(shaderProgram, "normal");
gl.enableVertexAttribArray(normalLocation);
let texCoordLocation = gl.getAttribLocation(shaderProgram, "texCoord");
gl.enableVertexAttribArray(texCoordLocation);

let modelViewMatrixLocation = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
let projectionMatrixLocation = gl.getUniformLocation(shaderProgram, "projectionMatrix");
let normalMatrixLocation = gl.getUniformLocation(shaderProgram, "normalMatrix");

const light1DirectionLocation = gl.getUniformLocation(shaderProgram, 'light1Direction');
const light2ColorLocation= gl.getUniformLocation(shaderProgram, 'light2Color');
const light2DirectionLocation= gl.getUniformLocation(shaderProgram, 'light2Direction');
const dirLightDirectionLocation= gl.getUniformLocation(shaderProgram, 'dirLightDirection');
const dirLightColorLocation= gl.getUniformLocation(shaderProgram, 'dirLightColor');
const pointLightDirectionLocation= gl.getUniformLocation(shaderProgram, 'pointLightPosition');
const pointLightColorLocation= gl.getUniformLocation(shaderProgram, 'pointLightColor');
const useGouraudLocation = gl.getUniformLocation(shaderProgram, "useGouraudShading");
const materialAmbientLocation = gl.getUniformLocation(shaderProgram, "materialAmbient");
const materialDiffuseLocation = gl.getUniformLocation(shaderProgram, "materialDiffuse");
const materialSpecularLocation = gl.getUniformLocation(shaderProgram, "materialSpecular");
const materialShininessLocation = gl.getUniformLocation(shaderProgram, "materialShininess");

const useTextureLocation = gl.getUniformLocation(shaderProgram, "useTexture");
const uTextureLocation = gl.getUniformLocation(shaderProgram, "uTexture");

function drawCubeOrPyramid(vertexBuffer, colorBuffer, normalBuffer, texCoordBuffer, vertexCount) {
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   gl.vertexAttribPointer(coordLocation, 3, gl.FLOAT, false, 0, 0);

   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
   gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

   gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
   gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);

   gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
   gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

   gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
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

function hexToVec3(hex) {
   const bigint = parseInt(hex.slice(1), 16);
   const r = ((bigint >> 16) & 255) / 255;
   const g = ((bigint >> 8) & 255) / 255;
   const b = (bigint & 255) / 255;
   return vec3.fromValues(r, g, b);
}

function updateView() {
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   gl.viewport(0, 0, canvas.width, canvas.height);

   gl.uniform3fv(light1DirectionLocation, [1.0, 1.0, 1.0]);

   const enablelight2 = document.getElementById('enableLight2').checked;
   const enableDir = document.getElementById('enableDirLight').checked;
   const enablePoint = document.getElementById('enablePointLight').checked;
   const useGouraud = document.getElementById("gouraudToggle").checked;

   // Второй свет
   if (enablelight2) {
      gl.uniform3fv(light2ColorLocation, [0.67, 0.4, 0.8]);
      gl.uniform3fv(light2DirectionLocation, [-1.0, 0.0, -1.0]);
   } else {
      gl.uniform3fv(light2ColorLocation, [0.0, 0.0, 0.0]);
   }

   // Третий — направленный
   if (enableDir) {
      gl.uniform3fv(dirLightColorLocation, [1.0, 0.67, 0.2]);
      gl.uniform3fv(dirLightDirectionLocation, [0.0, 1.0, 0.0]);
   } else {
      gl.uniform3fv(dirLightColorLocation, [0.0, 0.0, 0.0]);
   }

   // Четвёртый — позиционный
   if (enablePoint) {
      gl.uniform3fv(pointLightDirectionLocation, [0.5, 0.5, 0.0]);
      gl.uniform3fv(pointLightColorLocation, [0.4, 0.8, 1.0]);
   } else {
      gl.uniform3fv(pointLightColorLocation, [0.0, 0.0, 0.0]);
   }

   gl.uniform1i(useGouraudLocation, useGouraud ? 1 : 0);

   const ambient = hexToVec3(document.getElementById("ambientColor").value);
   const diffuse = hexToVec3(document.getElementById("diffuseColor").value);
   const specular = hexToVec3(document.getElementById("specularColor").value);
   const shininess = parseFloat(document.getElementById("shininess").value);
 
   gl.uniform3fv(materialAmbientLocation, ambient);
   gl.uniform3fv(materialDiffuseLocation, diffuse);
   gl.uniform3fv(materialSpecularLocation, specular);
   gl.uniform1f(materialShininessLocation, shininess);

   const useTexture = document.getElementById('useTexture').checked;
   gl.uniform1i(useTextureLocation, useTexture ? 1 : 0);

   const useScaleMin = document.getElementById('useScaleMin').checked;

   if (useTexture) {
      const textureSize = document.querySelector('input[name="textureSize"]:checked').value;
      let currentTexture;
      if (useScaleMin) {
         switch(textureSize) {
            case '128': currentTexture = texture128_min; break;
            case '256': currentTexture = texture256_min; break;
            case '512': currentTexture = texture512_min; break;
         }
      }
      else {
         switch(textureSize) {
            case '128': currentTexture = texture128; break;
            case '256': currentTexture = texture256; break;
            case '512': currentTexture = texture512; break;
         }
      }
      
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, currentTexture);
      gl.uniform1i(uTextureLocation, 0);
   }
    
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
   
   drawCubeOrPyramid(cubeBuffer, cubeColorBuffer, cubeNormalBuffer, cubeTexCoordBuffer, cubeVertices.length / 3);
   
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
   
   drawCubeOrPyramid(pyramidBuffer, pyramidColorBuffer, pyramidNormalBuffer, pyramidTexCoordBuffer, pyramidVertices.length / 3);
}


document.getElementById('projectionType').addEventListener('change', updateView);
document.getElementById('enableLight2').addEventListener('change', updateView);
document.getElementById('enableDirLight').addEventListener('change', updateView);
document.getElementById('enablePointLight').addEventListener('change', updateView);
document.getElementById('gouraudToggle').addEventListener('change', updateView);
document.getElementById('useTexture').addEventListener('change', updateView);
document.getElementById('useScaleMin').addEventListener('change', updateView);
document.querySelectorAll('input[name="textureSize"]').forEach(radio => {
   radio.addEventListener('change', updateView);
});
document.querySelectorAll('input').forEach(input => {
   input.addEventListener('input', updateView);
});
document.querySelectorAll("#material-control input").forEach(input => {
   input.addEventListener("input", () => {
      document.getElementById("shininessValue").textContent = document.getElementById("shininess").value;
   });
});

updateView();