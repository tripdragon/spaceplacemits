import{M as h,g as m,V as w,f as y,B as b,C as P,h as V,j as x,A as s,i as T,s as z,a as W,b as A,c as C,d as U,P as g,L as B}from"./superneatlib-55_7TcBu.js";const L=new URL("/spaceplacemits/assets/avatar1-BpA5NGyz.glb",import.meta.url).href,_=new V,N=`
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

`,S=`
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

`;async function D(a){const e=new h(L);await e.init(a),a.scene.add(e),a.sceneGrapth.add(e),e.selectorMesh&&(e.selectorMesh.visible=!1),e.scale.setScalar(.2),e.name="avatar1",e.position.y=.5,e.selectorMesh&&(e.selectorMesh.onTap=(function(){console.log("not a tap yet"),this.rootObject.onTap()}).bind(e.selectorMesh)),console.log(e.checkMappedMaterials()),e.traverse(o=>{o.isMesh&&console.log(o.name)});try{let o=e.getObjectByName("head1"),d=e.getObjectByName("hand_l"),v=e.getObjectByName("hand_r");const p={u_time:{value:1},u_fresnel:{value:.55},u_fresnel_b:{value:.082},cameraPosition:{value:new m},u_color:{value:new m(0,1,0)},u_resolution:{value:new w(window.innerWidth,window.innerHeight)}},u=new y({uniforms:p,vertexShader:N,fragmentShader:S,transparent:!0,side:b});o.material=u,d.material=u,v.material=u;const r=a.debuggerlilGui.get(),n={show:!0,fresnel:1,fresnel_b:1,color:{color:"#ff0000"}},i=r.addFolder("avatar");i.add(n,"show").onChange(t=>{e.visible=t}),i.add(n,"fresnel",0,2).onChange(t=>{o.material.uniforms.u_fresnel.value=t}),i.add(n,"fresnel_b",0,2).onChange(t=>{o.material.uniforms.u_fresnel_b.value=t});const M=new P;i.addColor(n,"color").onChange(t=>{o.material.uniforms.u_color.value.set(t.r,t.g,t.b)});const f=.2,c=e.position.clone();e.update=function(t){e.position.x=Math.sin(_.getElapsedTime()*2)*f,e.position.y=Math.cos(_.getElapsedTime()*2)*f,e.position.z=Math.cos(_.getElapsedTime()*2)*f,e.position.add(c)},a.sceneGrapth.add(d),d.update=function(t){d.rotation.x+=.1},a.sceneGrapth.add(v),v.update=function(t){v.rotation.x+=-.1}}catch(o){console.log("e",o)}return e}const G=new URL("/spaceplacemits/assets/handModel1-BXQ-l0qP.glb",import.meta.url).href,j=`
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

`,O=`
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

`;async function k(a){const e=new h(G);await e.init(a),a.scene.add(e),a.sceneGrapth.add(e),e.selectorMesh&&(e.selectorMesh.visible=!1),e.scale.setScalar(.02),e.rotation.y=-Math.PI,e.name="avatar1",e.shouldAnimateMixer=!0,console.log(e),window.mm=e,e.selectorMesh&&(e.selectorMesh.onTap=(function(){console.log("not a tap yet"),this.rootObject.onTap()}).bind(e.selectorMesh)),console.log(e.checkMappedMaterials()),e.traverse(o=>{o.isMesh&&console.log(o.name)});try{let n=function(c){console.log("pose",c);const t=.2,l=e.actions[c];if(l.clampWhenFinished=!0,l.loop=x,l){if(l===e.currentAction)return;e.currentAction?(e.previousAction=e.currentAction,l.reset(),e.currentAction.crossFadeTo(l,t),l.play(),console.log("?111")):(console.log("?222"),e.currentAction=l,l.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(t).play()),e.currentAction=l}},o=e.getObjectByName("hand1");const d={u_time:{value:1},u_fresnel:{value:.55},u_fresnel_b:{value:.082},cameraPosition:{value:new m},u_color:{value:new m(0,1,0)},u_resolution:{value:new w(window.innerWidth,window.innerHeight)}},v=new y({uniforms:d,vertexShader:j,fragmentShader:O,transparent:!0,side:b}),p=a.debuggerlilGui.get(),u={show:!0,fresnel:1,fresnel_b:1,color:{color:"#ff0000"}},r=p.addFolder("hand");r.add(u,"show").onChange(c=>{e.visible=c});const i={peace:function(){n("peace")},fist:function(){n("fist")},calm:function(){n("calm")},heart:function(){n("heart")},open:function(){n("open")},palm_close:function(){n("palm_close")},palm_open:function(){n("palm_open")},pinch:function(){n("pinch")},rock:function(){n("rock")},thumbs_up:function(){n("thumbs_up")}};r.add(i,"peace").onChange(c=>{}),r.add(i,"fist"),r.add(i,"calm"),r.add(i,"heart"),r.add(i,"open"),r.add(i,"palm_open"),r.add(i,"palm_close"),r.add(i,"pinch"),r.add(i,"rock"),r.add(i,"thumbs_up");const M=.2,f=e.position.clone();e.update=function(c){}}catch(o){console.log("e",o)}return e}async function E(){window.app=s,T(s),z(s),W(s),A(s),C(s),U({store:s,type:"y"});const a=s.scene,e=s.camera;s.renderer;{const o=new g(16777215,2,100);o.position.set(5,5,1),a.add(o),o.intensity=100}{const o=new g(16777215,2,100);o.position.set(-5,5,-1),a.add(o),o.intensity=100}B.hemisphereLight(s.scene),e.position.z=.7,e.position.y=.5,D(s),k(s)}function F(){E()}F();
