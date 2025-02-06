import{M,g as f,V as h,f as y,B as b,C as T,h as V,j as C,A as n,i as x,s as z,a as A,b as N,k as W,l as _,c as B,d as L,P as w,L as S,N as U,R as G,m as D,n as j,o as F,p as k}from"./superneatlib-CaOIzpxy.js";const E=new URL("/spaceplacemits/assets/avatar1-BpA5NGyz.glb",import.meta.url).href,g=new V,O=`
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

`,R=`
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

`;async function H(r){const e=new M(E);await e.init(r),r.scene.add(e),r.sceneGrapth.add(e),e.selectorMesh&&(e.selectorMesh.visible=!1),e.scale.setScalar(.2),e.name="avatar1",e.position.y=.5,e.selectorMesh&&(e.selectorMesh.onTap=(function(){console.log("not a tap yet"),this.rootObject.onTap()}).bind(e.selectorMesh)),console.log(e.checkMappedMaterials()),e.traverse(i=>{i.isMesh&&console.log(i.name)});try{let i=e.getObjectByName("head1"),l=e.getObjectByName("hand_l"),p=e.getObjectByName("hand_r");const m={u_time:{value:1},u_fresnel:{value:.55},u_fresnel_b:{value:.082},cameraPosition:{value:new f},u_color:{value:new f(0,1,0)},u_resolution:{value:new h(window.innerWidth,window.innerHeight)}},d=new y({uniforms:m,vertexShader:O,fragmentShader:R,transparent:!0,side:b});i.material=d,l.material=d,p.material=d;const o=r.debuggerlilGui.get(),a={show:!0,fresnel:1,fresnel_b:1,color:{color:"#ff0000"}},t=o.addFolder("avatar");t.add(a,"show").onChange(s=>{e.visible=s}),t.add(a,"fresnel",0,2).onChange(s=>{i.material.uniforms.u_fresnel.value=s}),t.add(a,"fresnel_b",0,2).onChange(s=>{i.material.uniforms.u_fresnel_b.value=s});const P=new T;t.addColor(a,"color").onChange(s=>{i.material.uniforms.u_color.value.set(s.r,s.g,s.b)});const v=.2,u=e.position.clone();e.update=function(s){e.position.x=Math.sin(g.getElapsedTime()*2)*v,e.position.y=Math.cos(g.getElapsedTime()*2)*v,e.position.z=Math.cos(g.getElapsedTime()*2)*v,e.position.add(u)},r.sceneGrapth.add(l),l.update=function(s){l.rotation.x+=.1},r.sceneGrapth.add(p),p.update=function(s){p.rotation.x+=-.1}}catch(i){console.log("e",i)}return e}const X=new URL("/spaceplacemits/assets/handModel1-BXQ-l0qP.glb",import.meta.url).href,$=`
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

`,I=`
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

`;async function q(r){const e=new M(X);await e.init(r),r.scene.add(e),r.sceneGrapth.add(e),e.selectorMesh&&(e.selectorMesh.visible=!1),e.scale.setScalar(.02),e.rotation.y=-Math.PI,e.name="avatar1",e.shouldAnimateMixer=!0,console.log(e),window.mm=e,e.selectorMesh&&(e.selectorMesh.onTap=(function(){console.log("not a tap yet"),this.rootObject.onTap()}).bind(e.selectorMesh)),console.log(e.checkMappedMaterials()),e.traverse(i=>{i.isMesh&&console.log(i.name)});try{let a=function(u){console.log("pose",u);const s=.2,c=e.actions[u];if(c.clampWhenFinished=!0,c.loop=C,c){if(c===e.currentAction)return;e.currentAction?(e.previousAction=e.currentAction,c.reset(),e.currentAction.crossFadeTo(c,s),c.play(),console.log("?111")):(console.log("?222"),e.currentAction=c,c.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(s).play()),e.currentAction=c}},i=e.getObjectByName("hand1");const l={u_time:{value:1},u_fresnel:{value:.55},u_fresnel_b:{value:.082},cameraPosition:{value:new f},u_color:{value:new f(0,1,0)},u_resolution:{value:new h(window.innerWidth,window.innerHeight)}},p=new y({uniforms:l,vertexShader:$,fragmentShader:I,transparent:!0,side:b}),m=r.debuggerlilGui.get(),d={show:!0,fresnel:1,fresnel_b:1,color:{color:"#ff0000"}},o=m.addFolder("hand");o.add(d,"show").onChange(u=>{e.visible=u});const t={peace:function(){a("peace")},fist:function(){a("fist")},calm:function(){a("calm")},heart:function(){a("heart")},open:function(){a("open")},palm_close:function(){a("palm_close")},palm_open:function(){a("palm_open")},pinch:function(){a("pinch")},rock:function(){a("rock")},thumbs_up:function(){a("thumbs_up")}};o.add(t,"peace").onChange(u=>{}),o.add(t,"fist"),o.add(t,"calm"),o.add(t,"heart"),o.add(t,"open"),o.add(t,"palm_open"),o.add(t,"palm_close"),o.add(t,"pinch"),o.add(t,"rock"),o.add(t,"thumbs_up");const P=.2,v=e.position.clone();e.update=function(u){}}catch(i){console.log("e",i)}return e}async function Q(){window.app=n,x(n),z(n),A(n),N(n);const r=2;W(n,{strength:.412,radius:.05,threshold:.001,resolution:new h(r,r)}),n.postProcessing.useComposer=!1,n.renderer.toneMapping=_;const e=n.debuggerlilGui.get(),i={useBloom:n.postProcessing.useComposer,strength:1,radius:1,threshold:1,tones:n.renderer.toneMapping},l=e.addFolder("bloom"),p={NoToneMapping:U,LinearToneMapping:_,ReinhardToneMapping:G,CineonToneMapping:D,ACESFilmicToneMapping:j,AgXToneMapping:F,NeutralToneMapping:k};l.add(i,"tones",p).onChange(o=>{n.renderer.toneMapping=o}),l.add(i,"useBloom").onChange(o=>{n.postProcessing.useComposer=o}),l.add(i,"strength",0,4).onChange(o=>{n.postProcessing.bloomPass.strength=o}),l.add(i,"radius",0,40).onChange(o=>{n.postProcessing.bloomPass.radius=o}),l.add(i,"threshold",0,4).onChange(o=>{n.postProcessing.bloomPass.threshold=o}),B(n),L({store:n,type:"y"});const m=n.scene,d=n.camera;n.renderer;{const o=new w(16777215,2,100);o.position.set(5,5,1),m.add(o),o.intensity=100}{const o=new w(16777215,2,100);o.position.set(-5,5,-1),m.add(o),o.intensity=100}S.hemisphereLight(n.scene),d.position.z=.7,d.position.y=.5,H(n),q(n)}function J(){Q()}J();
