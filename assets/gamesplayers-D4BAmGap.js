var H=Object.defineProperty;var I=(o,i,t)=>i in o?H(o,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[i]=t;var v=(o,i,t)=>I(o,typeof i!="symbol"?i+"":i,t);import{M as W,C as P,g as _,V as D,f as L,B as U,h as j,S as F,k as G,l as X,A as w,P as O,u as b}from"./superneatlib-CDdrmZ-Y.js";const z=`
varying vec2 v_UV; // Pass UV coordinates to fragment shader
// uniform float uv_scale;
uniform vec2 uv_scale;
varying vec3 v_Normal;
varying vec3 v_Position;
varying vec3 v_PositionW;

varying vec3 v_ViewDir;

void main() {

  v_Position = position;

  v_PositionW = normalize(vec3(modelViewMatrix * vec4(position, 1.0)).xyz);
  v_Normal = normalize(normalMatrix * normal);

  vec4 viewPosition = normalize(vec4(modelViewMatrix * vec4(position, 1.0)));
  v_ViewDir = normalize(-viewPosition.xyz);

  v_UV = uv;// Assign built-in UV coordinates

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`,E=`
#ifdef GL_ES
precision mediump float;
#endif


//#include "../../../../node_modules/lygia/draw/circle.glsl"
// #include "/node_modules/lygia/draw/circle.glsl"

varying vec2 v_UV; // Receive UV coordinates
varying vec3 v_PositionW;
varying vec3 v_Normal;

uniform vec2 u_resolution;
uniform float u_fresnel;
uniform float u_fresnel_b;
uniform vec3 u_color;

varying vec3 v_ViewDir;

void main() {

    float power = u_fresnel;

    // cameraPosition is global from three
    vec3 viewDirectionW = normalize(cameraPosition - v_PositionW);
    float fresnelTerm = 1.0 - dot(v_Normal, viewDirectionW);
    fresnelTerm *= power;

    fresnelTerm = smoothstep(0.0,1.0-fresnelTerm,u_fresnel_b);

    vec3 color = u_color;

    gl_FragColor = vec4(color,1.0) * vec4(1.0-fresnelTerm);

}

`,y=new j;async function Y({store:o,name:i="avatar",modelurl:t,debuggers:d=!1,color:s=65280}){const e=new W(t);await e.init(o),o.addObject3D(e),e.selectorMesh&&(e.selectorMesh.visible=!1),e.name=i,e.selectorMesh&&(e.selectorMesh.onTap=(function(){console.log("not a tap yet"),this.rootObject.onTap()}).bind(e.selectorMesh)),console.log(e.checkMappedMaterials()),e.traverse(n=>{n.isMesh&&console.log(n.name)});let r=e.getObjectByName("head1");if(e.getObjectByName("hand_l"),e.getObjectByName("hand_r"),e.fullyRemoveObjectWithName("hand_r"),e.fullyRemoveObjectWithName("hand_l"),r){r.material.color.setHex(s);const n=new P(s),l={u_time:{value:1},u_fresnel:{value:.55},u_fresnel_b:{value:.082},cameraPosition:{value:new _},u_color:{value:new _().fromArray(n.toArray())},u_resolution:{value:new D(window.innerWidth,window.innerHeight)}},a=new L({uniforms:l,vertexShader:z,fragmentShader:E,transparent:!0,side:U});r.material=a}if(d)try{const n=o.debuggerlilGui.get(),l={show:!0,fresnel:1,fresnel_b:1,color:{color:"#ff0000"}},a=n.addFolder(e.name);a.add(l,"show").onChange(f=>{e.visible=f}),a.add(l,"fresnel",0,2).onChange(f=>{r.material.uniforms.u_fresnel.value=f}),a.add(l,"fresnel_b",0,2).onChange(f=>{r.material.uniforms.u_fresnel_b.value=f});const c=new P;a.addColor(l,"color").onChange(f=>{r.material.uniforms.u_color.value.set(f.r,f.g,f.b)});const h=.2,m=e.position.clone();e.update=function(f){e.position.x=Math.sin(y.getElapsedTime()*2)*h,e.position.y=Math.cos(y.getElapsedTime()*2)*h,e.position.z=Math.cos(y.getElapsedTime()*2)*h,e.position.add(m)}}catch(n){console.log("e",n)}return e}function Z(o){o.delay=900,o.stopSeek=!1,o.stopAction=(function(){this.currentAction&&this.currentAction.stop(),this.mixer.removeEventListener("finished",this.goAgain),this.stopSeek=!0}).bind(o),o.seekPose=function(i){this.changeRandomAction(),this.stopSeek=!1,this.mixer.addEventListener("finished",this.goAgain)},o.goAgain=(function(){this.mixer.removeEventListener("finished",this.goAgain),!this.stopSeek&&setTimeout(i=>{this.seekPose()},this.delay)}).bind(o)}async function N({store:o,name:i="hand",modelurl:t,debuggers:d=!1,color:s=65280}){const e=new W(t);await e.init(o),o.addObject3D(e),e.selectorMesh&&(e.selectorMesh.visible=!1),e.name=i,e.shouldAnimateMixer=!0,Z(e),console.log(e),window.mm=e,e.selectorMesh&&(e.selectorMesh.onTap=(function(){console.log("not a tap yet"),this.rootObject.onTap()}).bind(e.selectorMesh)),e.traverse(n=>{n.isMesh&&console.log(n.name)});let r=e.getObjectByName("hand1");if(r){r.material.color.setHex(s);const n=new P(s),l={u_time:{value:1},u_fresnel:{value:.55},u_fresnel_b:{value:.082},cameraPosition:{value:new _},u_color:{value:new _().fromArray(n.toArray())},u_resolution:{value:new D(window.innerWidth,window.innerHeight)}};new L({uniforms:l,vertexShader:z,fragmentShader:E,transparent:!0,side:U})}if(d)try{const n=o.debuggerlilGui.get(),l={show:!0,fresnel:1,fresnel_b:1,color:{color:"#ff0000"}},a=n.addFolder(e.name);a.add(l,"show").onChange(f=>{e.visible=f});const c={stop:function(){e.stopAction().call(e)},peace:function(){e.changeAction("peace")},fist:function(){e.changeAction("fist")},calm:function(){e.changeAction("calm")},heart:function(){e.changeAction("heart")},open:function(){e.changeAction("open")},palm_close:function(){e.changeAction("palm_close")},palm_open:function(){e.changeAction("palm_open")},pinch:function(){e.changeAction("pinch")},rock:function(){e.changeAction("rock")},thumbs_up:function(){e.changeAction("thumbs_up")}};a.add(c,"stop"),a.add(c,"peace").onChange(f=>{}),a.add(c,"fist"),a.add(c,"calm"),a.add(c,"heart"),a.add(c,"open"),a.add(c,"palm_open"),a.add(c,"palm_close"),a.add(c,"pinch"),a.add(c,"rock"),a.add(c,"thumbs_up");const h=.2,m=e.position.clone();e.update=function(f){}}catch(n){console.log("e",n)}return e}class q extends F{constructor(){super();v(this,"isPlayer",!0);v(this,"hands",{left:null,right:null});v(this,"avatar",null);v(this,"head",null);v(this,"themeColor",null);v(this,"faire",{state:""})}setThemeColor(t){}}async function Q({store:o,color:i,avatarurl:t,handurl:d}){try{const s=await Y({store:o,modelurl:t,debuggers:!1,color:16711935});s.scaleTo(1);const e=.4,r=await N({name:"handleft",store:o,modelurl:d,debuggers:!1,color:65535});r.scaleTo(e);const n=await N({name:"handright",store:o,modelurl:d,debuggers:!1,color:43690});n.scaleTo(e),n.scale.x*=-1;const l=new q;o.addObject3D(l),l.position.y+=.5,l.hands.left=r,l.hands.right=n,l.add(r),l.add(n),l.add(s),n.visible=!1,r.visible=!1;const a=new G;l.updateMatrixWorld(),s.updateMatrix(),a.setFromObject(s);const c=s.getSizeAndCenter(),h=-.1,m=new _(c.center.x+c.size.x/2+h,-.4,.4);return r.position.copy(m),r.rotation.x=Math.PI/2,r.rotation.y=Math.PI/2,r.visible=!0,n.position.copy(m),n.position.x*=-1,n.rotation.x=Math.PI/2,n.rotation.y=-Math.PI/2,n.visible=!0,l}catch(s){console.log("e",s)}}const u=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];for(let o=0;o<256;o++)u[256+o]=u[o];function M(o){return o*o*o*(o*(o*6-15)+10)}function g(o,i,t){return i+o*(t-i)}function p(o,i,t,d){const s=o&15,e=s<8?i:t,r=s<4?t:s==12||s==14?i:d;return(s&1?-e:e)+(s&2?-r:r)}class ${noise(i,t,d){const s=Math.floor(i),e=Math.floor(t),r=Math.floor(d),n=s&255,l=e&255,a=r&255;i-=s,t-=e,d-=r;const c=i-1,h=t-1,m=d-1,f=M(i),x=M(t),R=M(d),T=u[n]+l,k=u[T]+a,B=u[T+1]+a,C=u[n+1]+l,S=u[C]+a,V=u[C+1]+a;return g(R,g(x,g(f,p(u[k],i,t,d),p(u[S],c,t,d)),g(f,p(u[B],i,h,d),p(u[V],c,h,d))),g(x,g(f,p(u[k+1],i,t,m),p(u[S+1],c,t,m)),g(f,p(u[B+1],i,h,m),p(u[V+1],c,h,m))))}}const J=new URL("/spaceplacemits/assets/avatar1-BpA5NGyz.glb",import.meta.url).href,K=new URL("/spaceplacemits/assets/handModel1-BXQ-l0qP.glb",import.meta.url).href,A=new $,ee=new j;async function oe(){console.log("inignigninioeit"),X(w);const o=w,i=w.scene;o.camera.position.z=1,o.camera.position.x=.5;{const e=new O(16777215,2,100);e.position.set(5,5,1),i.add(e),e.intensity=100}{const e=new O(16777215,2,100);e.position.set(-5,5,-1),i.add(e),e.intensity=100}const t=await Q({store:w,color:16776960,avatarurl:J,handurl:K});t.scaleTo(.5),t.position.y=.4,setTimeout(function(){t.hands.right.seekPose(),t.hands.left.seekPose()},1e3);const d=1,s=.2;t.position.clone(),t.update=function(e){const n=ee.getElapsedTime()*s;let l=A.noise(n,0,0),a=A.noise(0,0,n),c=A.noise(0,n,0);const h=b.remap(l,-1,1,-1,d),m=b.remap(a,-1,1,-1,d);b.remap(c,-1,1,-1,d),t.position.x=h,t.position.z=m}}function ne(){oe()}ne();
