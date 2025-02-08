var $=Object.defineProperty;var J=(o,n,t)=>n in o?$(o,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[n]=t;var w=(o,n,t)=>J(o,typeof n!="symbol"?n+"":n,t);import{M as N,C as G,g as m,V as L,f as U,B as E,h as I,S as K,k as R,Q as q,l as ee,G as oe,m as te,A as k,P as V,n as ne,e as C,u as S,o as j}from"./superneatlib-55_7TcBu.js";const F=`
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

`,Q=`
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

`,B=new I;async function ie({store:o,name:n="avatar",modelurl:t,debuggers:r=!1,color:a=65280}){const e=new N(t);await e.init(o),o.addObject3D(e),e.selectorMesh&&(e.selectorMesh.visible=!1),e.name=n,e.selectorMesh&&(e.selectorMesh.onTap=(function(){console.log("not a tap yet"),this.rootObject.onTap()}).bind(e.selectorMesh)),console.log(e.checkMappedMaterials()),e.traverse(i=>{i.isMesh&&console.log(i.name)});let l=e.getObjectByName("head1");if(e.getObjectByName("hand_l"),e.getObjectByName("hand_r"),e.fullyRemoveObjectWithName("hand_r"),e.fullyRemoveObjectWithName("hand_l"),l){l.material.color.setHex(a);const i=new G(a),c={u_time:{value:1},u_fresnel:{value:.55},u_fresnel_b:{value:.082},cameraPosition:{value:new m},u_color:{value:new m().fromArray(i.toArray())},u_resolution:{value:new L(window.innerWidth,window.innerHeight)}},s=new U({uniforms:c,vertexShader:F,fragmentShader:Q,transparent:!0,side:E});l.material=s}if(r)try{const i=o.debuggerlilGui.get(),c={show:!0,fresnel:1,fresnel_b:1,color:{color:"#ff0000"}},s=i.addFolder(e.name);s.add(c,"show").onChange(f=>{e.visible=f}),s.add(c,"fresnel",0,2).onChange(f=>{l.material.uniforms.u_fresnel.value=f}),s.add(c,"fresnel_b",0,2).onChange(f=>{l.material.uniforms.u_fresnel_b.value=f});const d=new G;s.addColor(c,"color").onChange(f=>{l.material.uniforms.u_color.value.set(f.r,f.g,f.b)});const g=.2,v=e.position.clone();e.update=function(f){e.position.x=Math.sin(B.getElapsedTime()*2)*g,e.position.y=Math.cos(B.getElapsedTime()*2)*g,e.position.z=Math.cos(B.getElapsedTime()*2)*g,e.position.add(v)}}catch(i){console.log("e",i)}return e}function ae(o){o.delay=900,o.stopSeek=!1,o.stopAction=(function(){this.currentAction&&this.currentAction.stop(),this.mixer.removeEventListener("finished",this.goAgain),this.stopSeek=!0}).bind(o),o.seekPose=function(n){this.changeRandomAction(),this.stopSeek=!1,this.mixer.addEventListener("finished",this.goAgain)},o.goAgain=(function(){this.mixer.removeEventListener("finished",this.goAgain),!this.stopSeek&&setTimeout(n=>{this.seekPose()},this.delay)}).bind(o)}async function W({store:o,name:n="hand",modelurl:t,debuggers:r=!1,color:a=65280}){const e=new N(t);await e.init(o),o.addObject3D(e),e.selectorMesh&&(e.selectorMesh.visible=!1),e.name=n,e.shouldAnimateMixer=!0,ae(e),console.log(e),window.mm=e,e.selectorMesh&&(e.selectorMesh.onTap=(function(){console.log("not a tap yet"),this.rootObject.onTap()}).bind(e.selectorMesh)),e.traverse(i=>{i.isMesh&&console.log(i.name)});let l=e.getObjectByName("hand1");if(l){l.material.color.setHex(a);const i=new G(a),c={u_time:{value:1},u_fresnel:{value:.55},u_fresnel_b:{value:.082},cameraPosition:{value:new m},u_color:{value:new m().fromArray(i.toArray())},u_resolution:{value:new L(window.innerWidth,window.innerHeight)}};new U({uniforms:c,vertexShader:F,fragmentShader:Q,transparent:!0,side:E})}if(r)try{const i=o.debuggerlilGui.get(),c={show:!0,fresnel:1,fresnel_b:1,color:{color:"#ff0000"}},s=i.addFolder(e.name);s.add(c,"show").onChange(f=>{e.visible=f});const d={stop:function(){e.stopAction().call(e)},peace:function(){e.changeAction("peace")},fist:function(){e.changeAction("fist")},calm:function(){e.changeAction("calm")},heart:function(){e.changeAction("heart")},open:function(){e.changeAction("open")},palm_close:function(){e.changeAction("palm_close")},palm_open:function(){e.changeAction("palm_open")},pinch:function(){e.changeAction("pinch")},rock:function(){e.changeAction("rock")},thumbs_up:function(){e.changeAction("thumbs_up")}};s.add(d,"stop"),s.add(d,"peace").onChange(f=>{}),s.add(d,"fist"),s.add(d,"calm"),s.add(d,"heart"),s.add(d,"open"),s.add(d,"palm_open"),s.add(d,"palm_close"),s.add(d,"pinch"),s.add(d,"rock"),s.add(d,"thumbs_up");const g=.2,v=e.position.clone();e.update=function(f){}}catch(i){console.log("e",i)}return e}new m;const D=new q,H=new q,se=new m;class re extends K{constructor(){super();w(this,"isPlayer",!0);w(this,"hands",{left:null,right:null});w(this,"avatar",null);w(this,"head",null);w(this,"themeColor",null);w(this,"animationStack",new R);w(this,"gazeTarget",{shouldTurnTowards:!1,targetPosition:new m,object:null,turnSpeed:.2});w(this,"faire",{state:""});this.update=function(t){for(let r=0;r<this.animationStack.length;r++)this.animationStack[r]()}}setGazeTargetObject(t){this.gazeTarget.shouldTurnTowards=!0,this.gazeTarget.object=t}turnHeadTowards(t){t&&(D.copy(this.head.quaternion),this.head.lookAt(t.getWorldPosition(se)),H.copy(this.head.quaternion),this.head.quaternion.copy(D),this.head.quaternion.slerp(H,.09))}setThemeColor(t){}}async function ce({store:o,color:n,avatarurl:t,handurl:r}){try{const a=await ie({store:o,modelurl:t,debuggers:!1,color:16711935});a.scaleTo(1);const e=.4,l=await W({name:"handleft",store:o,modelurl:r,debuggers:!1,color:65535});l.scaleTo(e);const i=await W({name:"handright",store:o,modelurl:r,debuggers:!1,color:43690});i.scaleTo(e),i.scale.x*=-1;const c=new re;o.addObject3D(c),c.position.y+=.5,c.hands.left=l,c.hands.right=i,c.avatar=a,c.head=a,c.add(l),c.add(i),c.add(a),i.visible=!1,l.visible=!1;const s=new ee;c.updateMatrixWorld(),a.updateMatrix(),s.setFromObject(a);const d=a.getSizeAndCenter(),g=-.1,v=new m(d.center.x+d.size.x/2+g,-.4,.4);return l.position.copy(v),l.rotation.x=Math.PI/2,l.rotation.y=Math.PI/2,l.visible=!0,i.position.copy(v),i.position.x*=-1,i.rotation.x=Math.PI/2,i.rotation.y=-Math.PI/2,i.visible=!0,c}catch(a){console.log("e",a)}}const h=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];for(let o=0;o<256;o++)h[256+o]=h[o];function z(o){return o*o*o*(o*(o*6-15)+10)}function y(o,n,t){return n+o*(t-n)}function b(o,n,t,r){const a=o&15,e=a<8?n:t,l=a<4?t:a==12||a==14?n:r;return(a&1?-e:e)+(a&2?-l:l)}class le{noise(n,t,r){const a=Math.floor(n),e=Math.floor(t),l=Math.floor(r),i=a&255,c=e&255,s=l&255;n-=a,t-=e,r-=l;const d=n-1,g=t-1,v=r-1,f=z(n),M=z(t),A=z(r),P=h[i]+c,p=h[P]+s,u=h[P+1]+s,_=h[i+1]+c,x=h[_]+s,T=h[_+1]+s;return y(A,y(M,y(f,b(h[p],n,t,r),b(h[x],d,t,r)),y(f,b(h[u],n,g,r),b(h[T],d,g,r))),y(M,y(f,b(h[p+1],n,t,v),b(h[x+1],d,t,v)),y(f,b(h[u+1],n,g,v),b(h[T+1],d,g,v))))}}function de({store:o,player:n}){const t=o.debuggerlilGui.get(),r={theta:0};t.addFolder("rotate player").add(r,"theta",0,Math.PI*2*8).onChange(e=>{console.log("theta",e),n.rotation.y=e})}function fe(o){if(o.spicemitts){console.log("already spicemitts");return}o.spicemitts={airToys:new R,sceneGrapth:new oe},o.scene.add(o.spicemitts.sceneGrapth)}const ue=new URL("/spaceplacemits/assets/avatar1-BpA5NGyz.glb",import.meta.url).href,he=new URL("/spaceplacemits/assets/handModel1-BXQ-l0qP.glb",import.meta.url).href,O=new le,pe=new I;async function me(){console.log("inignigninioeit"),te(k);const o=k,n=k.scene;o.camera.position.z=1,o.camera.position.x=.5;{const p=new V(16777215,2,100);p.position.set(5,5,1),n.add(p),p.intensity=100}{const p=new V(16777215,2,100);p.position.set(-5,5,-1),n.add(p),p.intensity=100}const t=await ce({store:k,color:16776960,avatarurl:ue,handurl:he});t.scaleTo(.5),t.position.y=.4,setTimeout(function(){t.hands.right.seekPose(),t.hands.left.seekPose()},1e3);const r=1,a=.2,e=t.position.clone();fe(o),de({store:o,player:t}),t.axisHelper.visible=!0;const l=new m;t.getWorldDirection(l);const i=new ne(t.forward,new m,2,16777215);t.add(i);const c=C.line({scene:o.spicemitts.sceneGrapth,p0:new m,p1:new m(0,0,2),size:.01}),s=C.line({scene:t,p0:new m,p1:new m(0,0,16),size:.01});t.head.add(s),t.animationStack.add(function(){const u=pe.getElapsedTime()*a;let _=O.noise(u,0,0),x=O.noise(0,0,u),T=O.noise(0,u,0);const X=S.remap(_,-1,1,-1,r),Y=S.remap(x,-1,1,-1,r),Z=S.remap(T,-1,1,-1,r);t.position.x=X,t.position.z=Y,t.position.y=Z+e.y}),new j;const d=50,g=.5,v=[];for(let p=0;p<d;p++){const u=C.cubey({store:o,scale:.1}),_=S.randomPosition(g+Math.random()*g);u.position.set(_.x,_.y,_.z),o.spicemitts.sceneGrapth.add(u),u.material=new j,v.push(u)}o.addObject3D(o.spicemitts.sceneGrapth),o.spicemitts.sceneGrapth.update=function(){o.spicemitts.sceneGrapth.rotation.y+=.01},t.animationStack.add(function(){t.turnHeadTowards(t.gazeTarget.object)});const f=new m;let M=0,A,P;A=setInterval(function(p){P&&P.material.color.setHex(16777215);const u=v[M];u.material.color.setHex(16776960),P=u,M++,t.setGazeTargetObject(u),c.updatePoints(f,u.position),M===v.length&&clearInterval(A)},2e3)}function ge(){me()}ge();
