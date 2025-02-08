var W=Object.defineProperty;var D=(o,s,t)=>s in o?W(o,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[s]=t;var g=(o,s,t)=>D(o,typeof s!="symbol"?s+"":s,t);import{M as S,C as x,g as f,V as z,f as C,B as O,h as H,S as N,k as G,Q as V,l as L,G as U,m as E,A as w,P as M,n as I,e as y,o as P,u as R}from"./superneatlib-55_7TcBu.js";const j=`
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

`,B=`
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

`,b=new H;async function q({store:o,name:s="avatar",modelurl:t,debuggers:u=!1,color:c=65280}){const e=new S(t);await e.init(o),o.addObject3D(e),e.selectorMesh&&(e.selectorMesh.visible=!1),e.name=s,e.selectorMesh&&(e.selectorMesh.onTap=(function(){console.log("not a tap yet"),this.rootObject.onTap()}).bind(e.selectorMesh)),console.log(e.checkMappedMaterials()),e.traverse(n=>{n.isMesh&&console.log(n.name)});let r=e.getObjectByName("head1");if(e.getObjectByName("hand_l"),e.getObjectByName("hand_r"),e.fullyRemoveObjectWithName("hand_r"),e.fullyRemoveObjectWithName("hand_l"),r){r.material.color.setHex(c);const n=new x(c),i={u_time:{value:1},u_fresnel:{value:.55},u_fresnel_b:{value:.082},cameraPosition:{value:new f},u_color:{value:new f().fromArray(n.toArray())},u_resolution:{value:new z(window.innerWidth,window.innerHeight)}},a=new C({uniforms:i,vertexShader:j,fragmentShader:B,transparent:!0,side:O});r.material=a}if(u)try{const n=o.debuggerlilGui.get(),i={show:!0,fresnel:1,fresnel_b:1,color:{color:"#ff0000"}},a=n.addFolder(e.name);a.add(i,"show").onChange(l=>{e.visible=l}),a.add(i,"fresnel",0,2).onChange(l=>{r.material.uniforms.u_fresnel.value=l}),a.add(i,"fresnel_b",0,2).onChange(l=>{r.material.uniforms.u_fresnel_b.value=l});const d=new x;a.addColor(i,"color").onChange(l=>{r.material.uniforms.u_color.value.set(l.r,l.g,l.b)});const m=.2,v=e.position.clone();e.update=function(l){e.position.x=Math.sin(b.getElapsedTime()*2)*m,e.position.y=Math.cos(b.getElapsedTime()*2)*m,e.position.z=Math.cos(b.getElapsedTime()*2)*m,e.position.add(v)}}catch(n){console.log("e",n)}return e}function F(o){o.delay=900,o.stopSeek=!1,o.stopAction=(function(){this.currentAction&&this.currentAction.stop(),this.mixer.removeEventListener("finished",this.goAgain),this.stopSeek=!0}).bind(o),o.seekPose=function(s){this.changeRandomAction(),this.stopSeek=!1,this.mixer.addEventListener("finished",this.goAgain)},o.goAgain=(function(){this.mixer.removeEventListener("finished",this.goAgain),!this.stopSeek&&setTimeout(s=>{this.seekPose()},this.delay)}).bind(o)}async function A({store:o,name:s="hand",modelurl:t,debuggers:u=!1,color:c=65280}){const e=new S(t);await e.init(o),o.addObject3D(e),e.selectorMesh&&(e.selectorMesh.visible=!1),e.name=s,e.shouldAnimateMixer=!0,F(e),console.log(e),window.mm=e,e.selectorMesh&&(e.selectorMesh.onTap=(function(){console.log("not a tap yet"),this.rootObject.onTap()}).bind(e.selectorMesh)),e.traverse(n=>{n.isMesh&&console.log(n.name)});let r=e.getObjectByName("hand1");if(r){r.material.color.setHex(c);const n=new x(c),i={u_time:{value:1},u_fresnel:{value:.55},u_fresnel_b:{value:.082},cameraPosition:{value:new f},u_color:{value:new f().fromArray(n.toArray())},u_resolution:{value:new z(window.innerWidth,window.innerHeight)}};new C({uniforms:i,vertexShader:j,fragmentShader:B,transparent:!0,side:O})}if(u)try{const n=o.debuggerlilGui.get(),i={show:!0,fresnel:1,fresnel_b:1,color:{color:"#ff0000"}},a=n.addFolder(e.name);a.add(i,"show").onChange(l=>{e.visible=l});const d={stop:function(){e.stopAction().call(e)},peace:function(){e.changeAction("peace")},fist:function(){e.changeAction("fist")},calm:function(){e.changeAction("calm")},heart:function(){e.changeAction("heart")},open:function(){e.changeAction("open")},palm_close:function(){e.changeAction("palm_close")},palm_open:function(){e.changeAction("palm_open")},pinch:function(){e.changeAction("pinch")},rock:function(){e.changeAction("rock")},thumbs_up:function(){e.changeAction("thumbs_up")}};a.add(d,"stop"),a.add(d,"peace").onChange(l=>{}),a.add(d,"fist"),a.add(d,"calm"),a.add(d,"heart"),a.add(d,"open"),a.add(d,"palm_open"),a.add(d,"palm_close"),a.add(d,"pinch"),a.add(d,"rock"),a.add(d,"thumbs_up");const m=.2,v=e.position.clone();e.update=function(l){}}catch(n){console.log("e",n)}return e}new f;const T=new V,k=new V,Q=new f;class X extends N{constructor(){super();g(this,"isPlayer",!0);g(this,"hands",{left:null,right:null});g(this,"avatar",null);g(this,"head",null);g(this,"themeColor",null);g(this,"animationStack",new G);g(this,"gazeTarget",{shouldTurnTowards:!1,targetPosition:new f,object:null,turnSpeed:.2});g(this,"faire",{state:""});this.update=function(t){for(let u=0;u<this.animationStack.length;u++)this.animationStack[u]()}}setGazeTargetObject(t){this.gazeTarget.shouldTurnTowards=!0,this.gazeTarget.object=t}turnHeadTowards(t){T.copy(this.head.quaternion),this.head.lookAt(t.getWorldPosition(Q)),k.copy(this.head.quaternion),this.head.quaternion.copy(T),this.head.quaternion.slerp(k,.2)}setThemeColor(t){}}async function J({store:o,color:s,avatarurl:t,handurl:u}){try{const c=await q({store:o,modelurl:t,debuggers:!1,color:16711935});c.scaleTo(1);const e=.4,r=await A({name:"handleft",store:o,modelurl:u,debuggers:!1,color:65535});r.scaleTo(e);const n=await A({name:"handright",store:o,modelurl:u,debuggers:!1,color:43690});n.scaleTo(e),n.scale.x*=-1;const i=new X;o.addObject3D(i),i.position.y+=.5,i.hands.left=r,i.hands.right=n,i.avatar=c,i.head=c,i.add(r),i.add(n),i.add(c),n.visible=!1,r.visible=!1;const a=new L;i.updateMatrixWorld(),c.updateMatrix(),a.setFromObject(c);const d=c.getSizeAndCenter(),m=-.1,v=new f(d.center.x+d.size.x/2+m,-.4,.4);return r.position.copy(v),r.rotation.x=Math.PI/2,r.rotation.y=Math.PI/2,r.visible=!0,n.position.copy(v),n.position.x*=-1,n.rotation.x=Math.PI/2,n.rotation.y=-Math.PI/2,n.visible=!0,i}catch(c){console.log("e",c)}}function K({store:o,player:s}){const t=o.debuggerlilGui.get(),u={theta:0};t.addFolder("rotate player").add(u,"theta",0,Math.PI*2*8).onChange(e=>{console.log("theta",e),s.rotation.y=e})}function Y(o){if(o.spicemitts){console.log("already spicemitts");return}o.spicemitts={airToys:new G,sceneGrapth:new U},o.scene.add(o.spicemitts.sceneGrapth)}const Z=new URL("/spaceplacemits/assets/avatar1-BpA5NGyz.glb",import.meta.url).href,$=new URL("/spaceplacemits/assets/handModel1-BXQ-l0qP.glb",import.meta.url).href;async function ee(){console.log("inignigninioeit"),E(w);const o=w,s=w.scene;o.camera.position.z=1,o.camera.position.x=.5;{const h=new M(16777215,2,100);h.position.set(5,5,1),s.add(h),h.intensity=100}{const h=new M(16777215,2,100);h.position.set(-5,5,-1),s.add(h),h.intensity=100}const t=await J({store:w,color:16776960,avatarurl:Z,handurl:$});t.scaleTo(.5),t.position.y=.4,setTimeout(function(){t.hands.right.seekPose(),t.hands.left.seekPose()},1e3),t.position.clone(),Y(o),K({store:o,player:t}),t.axisHelper.visible=!0;const u=new f;t.getWorldDirection(u);const c=new I(t.forward,new f,2,16777215);t.add(c);const e=y.line({scene:o.spicemitts.sceneGrapth,p0:new f,p1:new f(0,0,2),size:.01}),r=y.line({scene:t,p0:new f,p1:new f(0,0,16),size:.01});t.head.add(r),new P;const n=50,i=.5,a=[];for(let h=0;h<n;h++){const p=y.cubey({store:o,scale:.1}),_=R.randomPosition(i+Math.random()*i);p.position.set(_.x,_.y,_.z),o.spicemitts.sceneGrapth.add(p),p.material=new P,a.push(p)}o.addObject3D(o.spicemitts.sceneGrapth),o.spicemitts.sceneGrapth.update=function(){o.spicemitts.sceneGrapth.rotation.y+=.03};const d=new f;let m=0,v,l;v=setInterval(function(h){l&&l.material.color.setHex(16777215);const p=a[m];p.material.color.setHex(16776960),l=p,m++,t.animationStack[0]=function(){t.turnHeadTowards(p)},e.updatePoints(d,p.position),m===a.length&&clearInterval(v)},2e3)}function oe(){ee()}oe();
