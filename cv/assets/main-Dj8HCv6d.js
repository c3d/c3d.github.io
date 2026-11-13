var Lt=Object.defineProperty;var Mt=n=>{throw TypeError(n)};var Pt=(n,e,t)=>e in n?Lt(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var ze=(n,e,t)=>Pt(n,typeof e!="symbol"?e+"":e,t),Dt=(n,e,t)=>e.has(n)||Mt("Cannot "+t);var yt=(n,e,t)=>e.has(n)?Mt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);var ut=(n,e,t)=>(Dt(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const REVISION="160",CullFaceNone=0,CullFaceBack=1,CullFaceFront=2,PCFShadowMap=1,PCFSoftShadowMap=2,VSMShadowMap=3,FrontSide=0,BackSide=1,DoubleSide=2,NoBlending=0,NormalBlending=1,AdditiveBlending=2,SubtractiveBlending=3,MultiplyBlending=4,CustomBlending=5,AddEquation=100,SubtractEquation=101,ReverseSubtractEquation=102,MinEquation=103,MaxEquation=104,ZeroFactor=200,OneFactor=201,SrcColorFactor=202,OneMinusSrcColorFactor=203,SrcAlphaFactor=204,OneMinusSrcAlphaFactor=205,DstAlphaFactor=206,OneMinusDstAlphaFactor=207,DstColorFactor=208,OneMinusDstColorFactor=209,SrcAlphaSaturateFactor=210,ConstantColorFactor=211,OneMinusConstantColorFactor=212,ConstantAlphaFactor=213,OneMinusConstantAlphaFactor=214,NeverDepth=0,AlwaysDepth=1,LessDepth=2,LessEqualDepth=3,EqualDepth=4,GreaterEqualDepth=5,GreaterDepth=6,NotEqualDepth=7,MultiplyOperation=0,MixOperation=1,AddOperation=2,NoToneMapping=0,LinearToneMapping=1,ReinhardToneMapping=2,CineonToneMapping=3,ACESFilmicToneMapping=4,CustomToneMapping=5,AgXToneMapping=6,UVMapping=300,CubeReflectionMapping=301,CubeRefractionMapping=302,EquirectangularReflectionMapping=303,EquirectangularRefractionMapping=304,CubeUVReflectionMapping=306,RepeatWrapping=1e3,ClampToEdgeWrapping=1001,MirroredRepeatWrapping=1002,NearestFilter=1003,NearestMipmapNearestFilter=1004,NearestMipmapLinearFilter=1005,LinearFilter=1006,LinearMipmapNearestFilter=1007,LinearMipmapLinearFilter=1008,UnsignedByteType=1009,ByteType=1010,ShortType=1011,UnsignedShortType=1012,IntType=1013,UnsignedIntType=1014,FloatType=1015,HalfFloatType=1016,UnsignedShort4444Type=1017,UnsignedShort5551Type=1018,UnsignedInt248Type=1020,AlphaFormat=1021,RGBAFormat=1023,LuminanceFormat=1024,LuminanceAlphaFormat=1025,DepthFormat=1026,DepthStencilFormat=1027,RedFormat=1028,RedIntegerFormat=1029,RGFormat=1030,RGIntegerFormat=1031,RGBAIntegerFormat=1033,RGB_S3TC_DXT1_Format=33776,RGBA_S3TC_DXT1_Format=33777,RGBA_S3TC_DXT3_Format=33778,RGBA_S3TC_DXT5_Format=33779,RGB_PVRTC_4BPPV1_Format=35840,RGB_PVRTC_2BPPV1_Format=35841,RGBA_PVRTC_4BPPV1_Format=35842,RGBA_PVRTC_2BPPV1_Format=35843,RGB_ETC1_Format=36196,RGB_ETC2_Format=37492,RGBA_ETC2_EAC_Format=37496,RGBA_ASTC_4x4_Format=37808,RGBA_ASTC_5x4_Format=37809,RGBA_ASTC_5x5_Format=37810,RGBA_ASTC_6x5_Format=37811,RGBA_ASTC_6x6_Format=37812,RGBA_ASTC_8x5_Format=37813,RGBA_ASTC_8x6_Format=37814,RGBA_ASTC_8x8_Format=37815,RGBA_ASTC_10x5_Format=37816,RGBA_ASTC_10x6_Format=37817,RGBA_ASTC_10x8_Format=37818,RGBA_ASTC_10x10_Format=37819,RGBA_ASTC_12x10_Format=37820,RGBA_ASTC_12x12_Format=37821,RGBA_BPTC_Format=36492,RGB_BPTC_SIGNED_Format=36494,RGB_BPTC_UNSIGNED_Format=36495,RED_RGTC1_Format=36283,SIGNED_RED_RGTC1_Format=36284,RED_GREEN_RGTC2_Format=36285,SIGNED_RED_GREEN_RGTC2_Format=36286,LinearEncoding=3e3,sRGBEncoding=3001,BasicDepthPacking=3200,RGBADepthPacking=3201,TangentSpaceNormalMap=0,ObjectSpaceNormalMap=1,NoColorSpace="",SRGBColorSpace="srgb",LinearSRGBColorSpace="srgb-linear",DisplayP3ColorSpace="display-p3",LinearDisplayP3ColorSpace="display-p3-linear",LinearTransfer="linear",SRGBTransfer="srgb",Rec709Primaries="rec709",P3Primaries="p3",KeepStencilOp=7680,AlwaysStencilFunc=519,NeverCompare=512,LessCompare=513,EqualCompare=514,LessEqualCompare=515,GreaterCompare=516,NotEqualCompare=517,GreaterEqualCompare=518,AlwaysCompare=519,StaticDrawUsage=35044,GLSL3="300 es",_SRGBAFormat=1035,WebGLCoordinateSystem=2e3,WebGPUCoordinateSystem=2001;class EventDispatcher{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const s=r.slice(0);for(let a=0,o=s.length;a<o;a++)s[a].call(this,e);e.target=null}}}const _lut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],DEG2RAD=Math.PI/180,RAD2DEG=180/Math.PI;function generateUUID(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(_lut[n&255]+_lut[n>>8&255]+_lut[n>>16&255]+_lut[n>>24&255]+"-"+_lut[e&255]+_lut[e>>8&255]+"-"+_lut[e>>16&15|64]+_lut[e>>24&255]+"-"+_lut[t&63|128]+_lut[t>>8&255]+"-"+_lut[t>>16&255]+_lut[t>>24&255]+_lut[r&255]+_lut[r>>8&255]+_lut[r>>16&255]+_lut[r>>24&255]).toLowerCase()}function clamp(n,e,t){return Math.max(e,Math.min(t,n))}function euclideanModulo(n,e){return(n%e+e)%e}function lerp(n,e,t){return(1-t)*n+t*e}function isPowerOfTwo(n){return(n&n-1)===0&&n!==0}function floorPowerOfTwo(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function denormalize(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function normalize(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Vector2{constructor(e=0,t=0){Vector2.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,s=e.elements;return this.x=s[0]*t+s[3]*r+s[6],this.y=s[1]*t+s[4]*r+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(clamp(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),s=Math.sin(t),a=this.x-e.x,o=this.y-e.y;return this.x=a*r-o*s+e.x,this.y=a*s+o*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Matrix3{constructor(e,t,r,s,a,o,l,c,u){Matrix3.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,s,a,o,l,c,u)}set(e,t,r,s,a,o,l,c,u){const h=this.elements;return h[0]=e,h[1]=s,h[2]=l,h[3]=t,h[4]=a,h[5]=c,h[6]=r,h[7]=o,h[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,s=t.elements,a=this.elements,o=r[0],l=r[3],c=r[6],u=r[1],h=r[4],f=r[7],p=r[2],_=r[5],x=r[8],g=s[0],d=s[3],m=s[6],b=s[1],E=s[4],T=s[7],P=s[2],C=s[5],w=s[8];return a[0]=o*g+l*b+c*P,a[3]=o*d+l*E+c*C,a[6]=o*m+l*T+c*w,a[1]=u*g+h*b+f*P,a[4]=u*d+h*E+f*C,a[7]=u*m+h*T+f*w,a[2]=p*g+_*b+x*P,a[5]=p*d+_*E+x*C,a[8]=p*m+_*T+x*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],s=e[2],a=e[3],o=e[4],l=e[5],c=e[6],u=e[7],h=e[8];return t*o*h-t*l*u-r*a*h+r*l*c+s*a*u-s*o*c}invert(){const e=this.elements,t=e[0],r=e[1],s=e[2],a=e[3],o=e[4],l=e[5],c=e[6],u=e[7],h=e[8],f=h*o-l*u,p=l*c-h*a,_=u*a-o*c,x=t*f+r*p+s*_;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/x;return e[0]=f*g,e[1]=(s*u-h*r)*g,e[2]=(l*r-s*o)*g,e[3]=p*g,e[4]=(h*t-s*c)*g,e[5]=(s*a-l*t)*g,e[6]=_*g,e[7]=(r*c-u*t)*g,e[8]=(o*t-r*a)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,s,a,o,l){const c=Math.cos(a),u=Math.sin(a);return this.set(r*c,r*u,-r*(c*o+u*l)+o+e,-s*u,s*c,-s*(-u*o+c*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(_m3.makeScale(e,t)),this}rotate(e){return this.premultiply(_m3.makeRotation(-e)),this}translate(e,t){return this.premultiply(_m3.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let s=0;s<9;s++)if(t[s]!==r[s])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _m3=new Matrix3;function arrayNeedsUint32(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function createElementNS(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function createCanvasElement(){const n=createElementNS("canvas");return n.style.display="block",n}const _cache={};function warnOnce(n){n in _cache||(_cache[n]=!0,console.warn(n))}const LINEAR_SRGB_TO_LINEAR_DISPLAY_P3=new Matrix3().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),LINEAR_DISPLAY_P3_TO_LINEAR_SRGB=new Matrix3().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),COLOR_SPACES={[LinearSRGBColorSpace]:{transfer:LinearTransfer,primaries:Rec709Primaries,toReference:n=>n,fromReference:n=>n},[SRGBColorSpace]:{transfer:SRGBTransfer,primaries:Rec709Primaries,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[LinearDisplayP3ColorSpace]:{transfer:LinearTransfer,primaries:P3Primaries,toReference:n=>n.applyMatrix3(LINEAR_DISPLAY_P3_TO_LINEAR_SRGB),fromReference:n=>n.applyMatrix3(LINEAR_SRGB_TO_LINEAR_DISPLAY_P3)},[DisplayP3ColorSpace]:{transfer:SRGBTransfer,primaries:P3Primaries,toReference:n=>n.convertSRGBToLinear().applyMatrix3(LINEAR_DISPLAY_P3_TO_LINEAR_SRGB),fromReference:n=>n.applyMatrix3(LINEAR_SRGB_TO_LINEAR_DISPLAY_P3).convertLinearToSRGB()}},SUPPORTED_WORKING_COLOR_SPACES=new Set([LinearSRGBColorSpace,LinearDisplayP3ColorSpace]),ColorManagement={enabled:!0,_workingColorSpace:LinearSRGBColorSpace,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!SUPPORTED_WORKING_COLOR_SPACES.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const r=COLOR_SPACES[e].toReference,s=COLOR_SPACES[t].fromReference;return s(r(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return COLOR_SPACES[n].primaries},getTransfer:function(n){return n===NoColorSpace?LinearTransfer:COLOR_SPACES[n].transfer}};function SRGBToLinear(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function LinearToSRGB(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let _canvas;class ImageUtils{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{_canvas===void 0&&(_canvas=createElementNS("canvas")),_canvas.width=e.width,_canvas.height=e.height;const r=_canvas.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=_canvas}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=createElementNS("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const s=r.getImageData(0,0,e.width,e.height),a=s.data;for(let o=0;o<a.length;o++)a[o]=SRGBToLinear(a[o]/255)*255;return r.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(SRGBToLinear(t[r]/255)*255):t[r]=SRGBToLinear(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _sourceId=0;class Source{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_sourceId++}),this.uuid=generateUUID(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let o=0,l=s.length;o<l;o++)s[o].isDataTexture?a.push(serializeImage(s[o].image)):a.push(serializeImage(s[o]))}else a=serializeImage(s);r.url=a}return t||(e.images[this.uuid]=r),r}}function serializeImage(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ImageUtils.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _textureId=0;class Texture extends EventDispatcher{constructor(e=Texture.DEFAULT_IMAGE,t=Texture.DEFAULT_MAPPING,r=ClampToEdgeWrapping,s=ClampToEdgeWrapping,a=LinearFilter,o=LinearMipmapLinearFilter,l=RGBAFormat,c=UnsignedByteType,u=Texture.DEFAULT_ANISOTROPY,h=NoColorSpace){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_textureId++}),this.uuid=generateUUID(),this.name="",this.source=new Source(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=a,this.minFilter=o,this.anisotropy=u,this.format=l,this.internalFormat=null,this.type=c,this.offset=new Vector2(0,0),this.repeat=new Vector2(1,1),this.center=new Vector2(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Matrix3,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(warnOnce("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===sRGBEncoding?SRGBColorSpace:NoColorSpace),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==UVMapping)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case RepeatWrapping:e.x=e.x-Math.floor(e.x);break;case ClampToEdgeWrapping:e.x=e.x<0?0:1;break;case MirroredRepeatWrapping:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case RepeatWrapping:e.y=e.y-Math.floor(e.y);break;case ClampToEdgeWrapping:e.y=e.y<0?0:1;break;case MirroredRepeatWrapping:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return warnOnce("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===SRGBColorSpace?sRGBEncoding:LinearEncoding}set encoding(e){warnOnce("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===sRGBEncoding?SRGBColorSpace:NoColorSpace}}Texture.DEFAULT_IMAGE=null;Texture.DEFAULT_MAPPING=UVMapping;Texture.DEFAULT_ANISOTROPY=1;class Vector4{constructor(e=0,t=0,r=0,s=1){Vector4.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,s){return this.x=e,this.y=t,this.z=r,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,s=this.z,a=this.w,o=e.elements;return this.x=o[0]*t+o[4]*r+o[8]*s+o[12]*a,this.y=o[1]*t+o[5]*r+o[9]*s+o[13]*a,this.z=o[2]*t+o[6]*r+o[10]*s+o[14]*a,this.w=o[3]*t+o[7]*r+o[11]*s+o[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,s,a;const c=e.elements,u=c[0],h=c[4],f=c[8],p=c[1],_=c[5],x=c[9],g=c[2],d=c[6],m=c[10];if(Math.abs(h-p)<.01&&Math.abs(f-g)<.01&&Math.abs(x-d)<.01){if(Math.abs(h+p)<.1&&Math.abs(f+g)<.1&&Math.abs(x+d)<.1&&Math.abs(u+_+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(u+1)/2,T=(_+1)/2,P=(m+1)/2,C=(h+p)/4,w=(f+g)/4,Y=(x+d)/4;return E>T&&E>P?E<.01?(r=0,s=.707106781,a=.707106781):(r=Math.sqrt(E),s=C/r,a=w/r):T>P?T<.01?(r=.707106781,s=0,a=.707106781):(s=Math.sqrt(T),r=C/s,a=Y/s):P<.01?(r=.707106781,s=.707106781,a=0):(a=Math.sqrt(P),r=w/a,s=Y/a),this.set(r,s,a,t),this}let b=Math.sqrt((d-x)*(d-x)+(f-g)*(f-g)+(p-h)*(p-h));return Math.abs(b)<.001&&(b=1),this.x=(d-x)/b,this.y=(f-g)/b,this.z=(p-h)/b,this.w=Math.acos((u+_+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class RenderTarget extends EventDispatcher{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Vector4(0,0,e,t),this.scissorTest=!1,this.viewport=new Vector4(0,0,e,t);const s={width:e,height:t,depth:1};r.encoding!==void 0&&(warnOnce("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),r.colorSpace=r.encoding===sRGBEncoding?SRGBColorSpace:NoColorSpace),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:LinearFilter,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},r),this.texture=new Texture(s,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=r.generateMipmaps,this.texture.internalFormat=r.internalFormat,this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}setSize(e,t,r=1){(this.width!==e||this.height!==t||this.depth!==r)&&(this.width=e,this.height=t,this.depth=r,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=r,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Source(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class WebGLRenderTarget extends RenderTarget{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class DataArrayTexture extends Texture{constructor(e=null,t=1,r=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:s},this.magFilter=NearestFilter,this.minFilter=NearestFilter,this.wrapR=ClampToEdgeWrapping,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Data3DTexture extends Texture{constructor(e=null,t=1,r=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:s},this.magFilter=NearestFilter,this.minFilter=NearestFilter,this.wrapR=ClampToEdgeWrapping,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Quaternion{constructor(e=0,t=0,r=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=s}static slerpFlat(e,t,r,s,a,o,l){let c=r[s+0],u=r[s+1],h=r[s+2],f=r[s+3];const p=a[o+0],_=a[o+1],x=a[o+2],g=a[o+3];if(l===0){e[t+0]=c,e[t+1]=u,e[t+2]=h,e[t+3]=f;return}if(l===1){e[t+0]=p,e[t+1]=_,e[t+2]=x,e[t+3]=g;return}if(f!==g||c!==p||u!==_||h!==x){let d=1-l;const m=c*p+u*_+h*x+f*g,b=m>=0?1:-1,E=1-m*m;if(E>Number.EPSILON){const P=Math.sqrt(E),C=Math.atan2(P,m*b);d=Math.sin(d*C)/P,l=Math.sin(l*C)/P}const T=l*b;if(c=c*d+p*T,u=u*d+_*T,h=h*d+x*T,f=f*d+g*T,d===1-l){const P=1/Math.sqrt(c*c+u*u+h*h+f*f);c*=P,u*=P,h*=P,f*=P}}e[t]=c,e[t+1]=u,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,r,s,a,o){const l=r[s],c=r[s+1],u=r[s+2],h=r[s+3],f=a[o],p=a[o+1],_=a[o+2],x=a[o+3];return e[t]=l*x+h*f+c*_-u*p,e[t+1]=c*x+h*p+u*f-l*_,e[t+2]=u*x+h*_+l*p-c*f,e[t+3]=h*x-l*f-c*p-u*_,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,s){return this._x=e,this._y=t,this._z=r,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,s=e._y,a=e._z,o=e._order,l=Math.cos,c=Math.sin,u=l(r/2),h=l(s/2),f=l(a/2),p=c(r/2),_=c(s/2),x=c(a/2);switch(o){case"XYZ":this._x=p*h*f+u*_*x,this._y=u*_*f-p*h*x,this._z=u*h*x+p*_*f,this._w=u*h*f-p*_*x;break;case"YXZ":this._x=p*h*f+u*_*x,this._y=u*_*f-p*h*x,this._z=u*h*x-p*_*f,this._w=u*h*f+p*_*x;break;case"ZXY":this._x=p*h*f-u*_*x,this._y=u*_*f+p*h*x,this._z=u*h*x+p*_*f,this._w=u*h*f-p*_*x;break;case"ZYX":this._x=p*h*f-u*_*x,this._y=u*_*f+p*h*x,this._z=u*h*x-p*_*f,this._w=u*h*f+p*_*x;break;case"YZX":this._x=p*h*f+u*_*x,this._y=u*_*f+p*h*x,this._z=u*h*x-p*_*f,this._w=u*h*f-p*_*x;break;case"XZY":this._x=p*h*f-u*_*x,this._y=u*_*f-p*h*x,this._z=u*h*x+p*_*f,this._w=u*h*f+p*_*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,s=Math.sin(r);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],s=t[4],a=t[8],o=t[1],l=t[5],c=t[9],u=t[2],h=t[6],f=t[10],p=r+l+f;if(p>0){const _=.5/Math.sqrt(p+1);this._w=.25/_,this._x=(h-c)*_,this._y=(a-u)*_,this._z=(o-s)*_}else if(r>l&&r>f){const _=2*Math.sqrt(1+r-l-f);this._w=(h-c)/_,this._x=.25*_,this._y=(s+o)/_,this._z=(a+u)/_}else if(l>f){const _=2*Math.sqrt(1+l-r-f);this._w=(a-u)/_,this._x=(s+o)/_,this._y=.25*_,this._z=(c+h)/_}else{const _=2*Math.sqrt(1+f-r-l);this._w=(o-s)/_,this._x=(a+u)/_,this._y=(c+h)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(clamp(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const s=Math.min(1,t/r);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,s=e._y,a=e._z,o=e._w,l=t._x,c=t._y,u=t._z,h=t._w;return this._x=r*h+o*l+s*u-a*c,this._y=s*h+o*c+a*l-r*u,this._z=a*h+o*u+r*c-s*l,this._w=o*h-r*l-s*c-a*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,s=this._y,a=this._z,o=this._w;let l=o*e._w+r*e._x+s*e._y+a*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=o,this._x=r,this._y=s,this._z=a,this;const c=1-l*l;if(c<=Number.EPSILON){const _=1-t;return this._w=_*o+t*this._w,this._x=_*r+t*this._x,this._y=_*s+t*this._y,this._z=_*a+t*this._z,this.normalize(),this}const u=Math.sqrt(c),h=Math.atan2(u,l),f=Math.sin((1-t)*h)/u,p=Math.sin(t*h)/u;return this._w=o*f+this._w*p,this._x=r*f+this._x*p,this._y=s*f+this._y*p,this._z=a*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=Math.random(),t=Math.sqrt(1-e),r=Math.sqrt(e),s=2*Math.PI*Math.random(),a=2*Math.PI*Math.random();return this.set(t*Math.cos(s),r*Math.sin(a),r*Math.cos(a),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Vector3{constructor(e=0,t=0,r=0){Vector3.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_quaternion$4.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_quaternion$4.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*r+a[6]*s,this.y=a[1]*t+a[4]*r+a[7]*s,this.z=a[2]*t+a[5]*r+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,s=this.z,a=e.elements,o=1/(a[3]*t+a[7]*r+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*r+a[8]*s+a[12])*o,this.y=(a[1]*t+a[5]*r+a[9]*s+a[13])*o,this.z=(a[2]*t+a[6]*r+a[10]*s+a[14])*o,this}applyQuaternion(e){const t=this.x,r=this.y,s=this.z,a=e.x,o=e.y,l=e.z,c=e.w,u=2*(o*s-l*r),h=2*(l*t-a*s),f=2*(a*r-o*t);return this.x=t+c*u+o*f-l*h,this.y=r+c*h+l*u-a*f,this.z=s+c*f+a*h-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*r+a[8]*s,this.y=a[1]*t+a[5]*r+a[9]*s,this.z=a[2]*t+a[6]*r+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,s=e.y,a=e.z,o=t.x,l=t.y,c=t.z;return this.x=s*c-a*l,this.y=a*o-r*c,this.z=r*l-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return _vector$c.copy(this).projectOnVector(e),this.sub(_vector$c)}reflect(e){return this.sub(_vector$c.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(clamp(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,s=this.z-e.z;return t*t+r*r+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const s=Math.sin(t)*e;return this.x=s*Math.sin(r),this.y=Math.cos(t)*e,this.z=s*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,r=Math.sqrt(1-e**2);return this.x=r*Math.cos(t),this.y=r*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _vector$c=new Vector3,_quaternion$4=new Quaternion;class Box3{constructor(e=new Vector3(1/0,1/0,1/0),t=new Vector3(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(_vector$b.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(_vector$b.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=_vector$b.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const a=r.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=a.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,_vector$b):_vector$b.fromBufferAttribute(a,o),_vector$b.applyMatrix4(e.matrixWorld),this.expandByPoint(_vector$b);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_box$4.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),_box$4.copy(r.boundingBox)),_box$4.applyMatrix4(e.matrixWorld),this.union(_box$4)}const s=e.children;for(let a=0,o=s.length;a<o;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,_vector$b),_vector$b.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_center),_extents.subVectors(this.max,_center),_v0$2.subVectors(e.a,_center),_v1$7.subVectors(e.b,_center),_v2$4.subVectors(e.c,_center),_f0.subVectors(_v1$7,_v0$2),_f1.subVectors(_v2$4,_v1$7),_f2.subVectors(_v0$2,_v2$4);let t=[0,-_f0.z,_f0.y,0,-_f1.z,_f1.y,0,-_f2.z,_f2.y,_f0.z,0,-_f0.x,_f1.z,0,-_f1.x,_f2.z,0,-_f2.x,-_f0.y,_f0.x,0,-_f1.y,_f1.x,0,-_f2.y,_f2.x,0];return!satForAxes(t,_v0$2,_v1$7,_v2$4,_extents)||(t=[1,0,0,0,1,0,0,0,1],!satForAxes(t,_v0$2,_v1$7,_v2$4,_extents))?!1:(_triangleNormal.crossVectors(_f0,_f1),t=[_triangleNormal.x,_triangleNormal.y,_triangleNormal.z],satForAxes(t,_v0$2,_v1$7,_v2$4,_extents))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_vector$b).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_vector$b).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_points[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_points[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_points[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_points[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_points[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_points[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_points[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_points[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_points),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const _points=[new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3],_vector$b=new Vector3,_box$4=new Box3,_v0$2=new Vector3,_v1$7=new Vector3,_v2$4=new Vector3,_f0=new Vector3,_f1=new Vector3,_f2=new Vector3,_center=new Vector3,_extents=new Vector3,_triangleNormal=new Vector3,_testAxis=new Vector3;function satForAxes(n,e,t,r,s){for(let a=0,o=n.length-3;a<=o;a+=3){_testAxis.fromArray(n,a);const l=s.x*Math.abs(_testAxis.x)+s.y*Math.abs(_testAxis.y)+s.z*Math.abs(_testAxis.z),c=e.dot(_testAxis),u=t.dot(_testAxis),h=r.dot(_testAxis);if(Math.max(-Math.max(c,u,h),Math.min(c,u,h))>l)return!1}return!0}const _box$3=new Box3,_v1$6=new Vector3,_v2$3=new Vector3;class Sphere{constructor(e=new Vector3,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):_box$3.setFromPoints(e).getCenter(r);let s=0;for(let a=0,o=e.length;a<o;a++)s=Math.max(s,r.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_v1$6.subVectors(e,this.center);const t=_v1$6.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),s=(r-this.radius)*.5;this.center.addScaledVector(_v1$6,s/r),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_v2$3.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_v1$6.copy(e.center).add(_v2$3)),this.expandByPoint(_v1$6.copy(e.center).sub(_v2$3))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _vector$a=new Vector3,_segCenter=new Vector3,_segDir=new Vector3,_diff=new Vector3,_edge1=new Vector3,_edge2=new Vector3,_normal$1=new Vector3;class Ray{constructor(e=new Vector3,t=new Vector3(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_vector$a)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_vector$a.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_vector$a.copy(this.origin).addScaledVector(this.direction,t),_vector$a.distanceToSquared(e))}distanceSqToSegment(e,t,r,s){_segCenter.copy(e).add(t).multiplyScalar(.5),_segDir.copy(t).sub(e).normalize(),_diff.copy(this.origin).sub(_segCenter);const a=e.distanceTo(t)*.5,o=-this.direction.dot(_segDir),l=_diff.dot(this.direction),c=-_diff.dot(_segDir),u=_diff.lengthSq(),h=Math.abs(1-o*o);let f,p,_,x;if(h>0)if(f=o*c-l,p=o*l-c,x=a*h,f>=0)if(p>=-x)if(p<=x){const g=1/h;f*=g,p*=g,_=f*(f+o*p+2*l)+p*(o*f+p+2*c)+u}else p=a,f=Math.max(0,-(o*p+l)),_=-f*f+p*(p+2*c)+u;else p=-a,f=Math.max(0,-(o*p+l)),_=-f*f+p*(p+2*c)+u;else p<=-x?(f=Math.max(0,-(-o*a+l)),p=f>0?-a:Math.min(Math.max(-a,-c),a),_=-f*f+p*(p+2*c)+u):p<=x?(f=0,p=Math.min(Math.max(-a,-c),a),_=p*(p+2*c)+u):(f=Math.max(0,-(o*a+l)),p=f>0?a:Math.min(Math.max(-a,-c),a),_=-f*f+p*(p+2*c)+u);else p=o>0?-a:a,f=Math.max(0,-(o*p+l)),_=-f*f+p*(p+2*c)+u;return r&&r.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(_segCenter).addScaledVector(_segDir,p),_}intersectSphere(e,t){_vector$a.subVectors(e.center,this.origin);const r=_vector$a.dot(this.direction),s=_vector$a.dot(_vector$a)-r*r,a=e.radius*e.radius;if(s>a)return null;const o=Math.sqrt(a-s),l=r-o,c=r+o;return c<0?null:l<0?this.at(c,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,s,a,o,l,c;const u=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,p=this.origin;return u>=0?(r=(e.min.x-p.x)*u,s=(e.max.x-p.x)*u):(r=(e.max.x-p.x)*u,s=(e.min.x-p.x)*u),h>=0?(a=(e.min.y-p.y)*h,o=(e.max.y-p.y)*h):(a=(e.max.y-p.y)*h,o=(e.min.y-p.y)*h),r>o||a>s||((a>r||isNaN(r))&&(r=a),(o<s||isNaN(s))&&(s=o),f>=0?(l=(e.min.z-p.z)*f,c=(e.max.z-p.z)*f):(l=(e.max.z-p.z)*f,c=(e.min.z-p.z)*f),r>c||l>s)||((l>r||r!==r)&&(r=l),(c<s||s!==s)&&(s=c),s<0)?null:this.at(r>=0?r:s,t)}intersectsBox(e){return this.intersectBox(e,_vector$a)!==null}intersectTriangle(e,t,r,s,a){_edge1.subVectors(t,e),_edge2.subVectors(r,e),_normal$1.crossVectors(_edge1,_edge2);let o=this.direction.dot(_normal$1),l;if(o>0){if(s)return null;l=1}else if(o<0)l=-1,o=-o;else return null;_diff.subVectors(this.origin,e);const c=l*this.direction.dot(_edge2.crossVectors(_diff,_edge2));if(c<0)return null;const u=l*this.direction.dot(_edge1.cross(_diff));if(u<0||c+u>o)return null;const h=-l*_diff.dot(_normal$1);return h<0?null:this.at(h/o,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Matrix4{constructor(e,t,r,s,a,o,l,c,u,h,f,p,_,x,g,d){Matrix4.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,s,a,o,l,c,u,h,f,p,_,x,g,d)}set(e,t,r,s,a,o,l,c,u,h,f,p,_,x,g,d){const m=this.elements;return m[0]=e,m[4]=t,m[8]=r,m[12]=s,m[1]=a,m[5]=o,m[9]=l,m[13]=c,m[2]=u,m[6]=h,m[10]=f,m[14]=p,m[3]=_,m[7]=x,m[11]=g,m[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Matrix4().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,s=1/_v1$5.setFromMatrixColumn(e,0).length(),a=1/_v1$5.setFromMatrixColumn(e,1).length(),o=1/_v1$5.setFromMatrixColumn(e,2).length();return t[0]=r[0]*s,t[1]=r[1]*s,t[2]=r[2]*s,t[3]=0,t[4]=r[4]*a,t[5]=r[5]*a,t[6]=r[6]*a,t[7]=0,t[8]=r[8]*o,t[9]=r[9]*o,t[10]=r[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,s=e.y,a=e.z,o=Math.cos(r),l=Math.sin(r),c=Math.cos(s),u=Math.sin(s),h=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){const p=o*h,_=o*f,x=l*h,g=l*f;t[0]=c*h,t[4]=-c*f,t[8]=u,t[1]=_+x*u,t[5]=p-g*u,t[9]=-l*c,t[2]=g-p*u,t[6]=x+_*u,t[10]=o*c}else if(e.order==="YXZ"){const p=c*h,_=c*f,x=u*h,g=u*f;t[0]=p+g*l,t[4]=x*l-_,t[8]=o*u,t[1]=o*f,t[5]=o*h,t[9]=-l,t[2]=_*l-x,t[6]=g+p*l,t[10]=o*c}else if(e.order==="ZXY"){const p=c*h,_=c*f,x=u*h,g=u*f;t[0]=p-g*l,t[4]=-o*f,t[8]=x+_*l,t[1]=_+x*l,t[5]=o*h,t[9]=g-p*l,t[2]=-o*u,t[6]=l,t[10]=o*c}else if(e.order==="ZYX"){const p=o*h,_=o*f,x=l*h,g=l*f;t[0]=c*h,t[4]=x*u-_,t[8]=p*u+g,t[1]=c*f,t[5]=g*u+p,t[9]=_*u-x,t[2]=-u,t[6]=l*c,t[10]=o*c}else if(e.order==="YZX"){const p=o*c,_=o*u,x=l*c,g=l*u;t[0]=c*h,t[4]=g-p*f,t[8]=x*f+_,t[1]=f,t[5]=o*h,t[9]=-l*h,t[2]=-u*h,t[6]=_*f+x,t[10]=p-g*f}else if(e.order==="XZY"){const p=o*c,_=o*u,x=l*c,g=l*u;t[0]=c*h,t[4]=-f,t[8]=u*h,t[1]=p*f+g,t[5]=o*h,t[9]=_*f-x,t[2]=x*f-_,t[6]=l*h,t[10]=g*f+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_zero,e,_one)}lookAt(e,t,r){const s=this.elements;return _z.subVectors(e,t),_z.lengthSq()===0&&(_z.z=1),_z.normalize(),_x.crossVectors(r,_z),_x.lengthSq()===0&&(Math.abs(r.z)===1?_z.x+=1e-4:_z.z+=1e-4,_z.normalize(),_x.crossVectors(r,_z)),_x.normalize(),_y.crossVectors(_z,_x),s[0]=_x.x,s[4]=_y.x,s[8]=_z.x,s[1]=_x.y,s[5]=_y.y,s[9]=_z.y,s[2]=_x.z,s[6]=_y.z,s[10]=_z.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,s=t.elements,a=this.elements,o=r[0],l=r[4],c=r[8],u=r[12],h=r[1],f=r[5],p=r[9],_=r[13],x=r[2],g=r[6],d=r[10],m=r[14],b=r[3],E=r[7],T=r[11],P=r[15],C=s[0],w=s[4],Y=s[8],y=s[12],A=s[1],V=s[5],H=s[9],ne=s[13],L=s[2],B=s[6],G=s[10],$=s[14],z=s[3],W=s[7],X=s[11],J=s[15];return a[0]=o*C+l*A+c*L+u*z,a[4]=o*w+l*V+c*B+u*W,a[8]=o*Y+l*H+c*G+u*X,a[12]=o*y+l*ne+c*$+u*J,a[1]=h*C+f*A+p*L+_*z,a[5]=h*w+f*V+p*B+_*W,a[9]=h*Y+f*H+p*G+_*X,a[13]=h*y+f*ne+p*$+_*J,a[2]=x*C+g*A+d*L+m*z,a[6]=x*w+g*V+d*B+m*W,a[10]=x*Y+g*H+d*G+m*X,a[14]=x*y+g*ne+d*$+m*J,a[3]=b*C+E*A+T*L+P*z,a[7]=b*w+E*V+T*B+P*W,a[11]=b*Y+E*H+T*G+P*X,a[15]=b*y+E*ne+T*$+P*J,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],s=e[8],a=e[12],o=e[1],l=e[5],c=e[9],u=e[13],h=e[2],f=e[6],p=e[10],_=e[14],x=e[3],g=e[7],d=e[11],m=e[15];return x*(+a*c*f-s*u*f-a*l*p+r*u*p+s*l*_-r*c*_)+g*(+t*c*_-t*u*p+a*o*p-s*o*_+s*u*h-a*c*h)+d*(+t*u*f-t*l*_-a*o*f+r*o*_+a*l*h-r*u*h)+m*(-s*l*h-t*c*f+t*l*p+s*o*f-r*o*p+r*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],s=e[2],a=e[3],o=e[4],l=e[5],c=e[6],u=e[7],h=e[8],f=e[9],p=e[10],_=e[11],x=e[12],g=e[13],d=e[14],m=e[15],b=f*d*u-g*p*u+g*c*_-l*d*_-f*c*m+l*p*m,E=x*p*u-h*d*u-x*c*_+o*d*_+h*c*m-o*p*m,T=h*g*u-x*f*u+x*l*_-o*g*_-h*l*m+o*f*m,P=x*f*c-h*g*c-x*l*p+o*g*p+h*l*d-o*f*d,C=t*b+r*E+s*T+a*P;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/C;return e[0]=b*w,e[1]=(g*p*a-f*d*a-g*s*_+r*d*_+f*s*m-r*p*m)*w,e[2]=(l*d*a-g*c*a+g*s*u-r*d*u-l*s*m+r*c*m)*w,e[3]=(f*c*a-l*p*a-f*s*u+r*p*u+l*s*_-r*c*_)*w,e[4]=E*w,e[5]=(h*d*a-x*p*a+x*s*_-t*d*_-h*s*m+t*p*m)*w,e[6]=(x*c*a-o*d*a-x*s*u+t*d*u+o*s*m-t*c*m)*w,e[7]=(o*p*a-h*c*a+h*s*u-t*p*u-o*s*_+t*c*_)*w,e[8]=T*w,e[9]=(x*f*a-h*g*a-x*r*_+t*g*_+h*r*m-t*f*m)*w,e[10]=(o*g*a-x*l*a+x*r*u-t*g*u-o*r*m+t*l*m)*w,e[11]=(h*l*a-o*f*a-h*r*u+t*f*u+o*r*_-t*l*_)*w,e[12]=P*w,e[13]=(h*g*s-x*f*s+x*r*p-t*g*p-h*r*d+t*f*d)*w,e[14]=(x*l*s-o*g*s-x*r*c+t*g*c+o*r*d-t*l*d)*w,e[15]=(o*f*s-h*l*s+h*r*c-t*f*c-o*r*p+t*l*p)*w,this}scale(e){const t=this.elements,r=e.x,s=e.y,a=e.z;return t[0]*=r,t[4]*=s,t[8]*=a,t[1]*=r,t[5]*=s,t[9]*=a,t[2]*=r,t[6]*=s,t[10]*=a,t[3]*=r,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,s))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),s=Math.sin(t),a=1-r,o=e.x,l=e.y,c=e.z,u=a*o,h=a*l;return this.set(u*o+r,u*l-s*c,u*c+s*l,0,u*l+s*c,h*l+r,h*c-s*o,0,u*c-s*l,h*c+s*o,a*c*c+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,s,a,o){return this.set(1,r,a,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,r){const s=this.elements,a=t._x,o=t._y,l=t._z,c=t._w,u=a+a,h=o+o,f=l+l,p=a*u,_=a*h,x=a*f,g=o*h,d=o*f,m=l*f,b=c*u,E=c*h,T=c*f,P=r.x,C=r.y,w=r.z;return s[0]=(1-(g+m))*P,s[1]=(_+T)*P,s[2]=(x-E)*P,s[3]=0,s[4]=(_-T)*C,s[5]=(1-(p+m))*C,s[6]=(d+b)*C,s[7]=0,s[8]=(x+E)*w,s[9]=(d-b)*w,s[10]=(1-(p+g))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,r){const s=this.elements;let a=_v1$5.set(s[0],s[1],s[2]).length();const o=_v1$5.set(s[4],s[5],s[6]).length(),l=_v1$5.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],_m1$2.copy(this);const u=1/a,h=1/o,f=1/l;return _m1$2.elements[0]*=u,_m1$2.elements[1]*=u,_m1$2.elements[2]*=u,_m1$2.elements[4]*=h,_m1$2.elements[5]*=h,_m1$2.elements[6]*=h,_m1$2.elements[8]*=f,_m1$2.elements[9]*=f,_m1$2.elements[10]*=f,t.setFromRotationMatrix(_m1$2),r.x=a,r.y=o,r.z=l,this}makePerspective(e,t,r,s,a,o,l=WebGLCoordinateSystem){const c=this.elements,u=2*a/(t-e),h=2*a/(r-s),f=(t+e)/(t-e),p=(r+s)/(r-s);let _,x;if(l===WebGLCoordinateSystem)_=-(o+a)/(o-a),x=-2*o*a/(o-a);else if(l===WebGPUCoordinateSystem)_=-o/(o-a),x=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,r,s,a,o,l=WebGLCoordinateSystem){const c=this.elements,u=1/(t-e),h=1/(r-s),f=1/(o-a),p=(t+e)*u,_=(r+s)*h;let x,g;if(l===WebGLCoordinateSystem)x=(o+a)*f,g=-2*f;else if(l===WebGPUCoordinateSystem)x=a*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=2*u,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-_,c[2]=0,c[6]=0,c[10]=g,c[14]=-x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let s=0;s<16;s++)if(t[s]!==r[s])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const _v1$5=new Vector3,_m1$2=new Matrix4,_zero=new Vector3(0,0,0),_one=new Vector3(1,1,1),_x=new Vector3,_y=new Vector3,_z=new Vector3,_matrix$1=new Matrix4,_quaternion$3=new Quaternion;class Euler{constructor(e=0,t=0,r=0,s=Euler.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,s=this._order){return this._x=e,this._y=t,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const s=e.elements,a=s[0],o=s[4],l=s[8],c=s[1],u=s[5],h=s[9],f=s[2],p=s[6],_=s[10];switch(t){case"XYZ":this._y=Math.asin(clamp(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,_),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(p,u),this._z=0);break;case"YXZ":this._x=Math.asin(-clamp(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(l,_),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(clamp(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,_),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-clamp(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,_),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(clamp(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,u),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(l,_));break;case"XZY":this._z=Math.asin(-clamp(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,u),this._y=Math.atan2(l,a)):(this._x=Math.atan2(-h,_),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return _matrix$1.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_matrix$1,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return _quaternion$3.setFromEuler(this),this.setFromQuaternion(_quaternion$3,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Euler.DEFAULT_ORDER="XYZ";class Layers{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let _object3DId=0;const _v1$4=new Vector3,_q1=new Quaternion,_m1$1=new Matrix4,_target=new Vector3,_position$3=new Vector3,_scale$2=new Vector3,_quaternion$2=new Quaternion,_xAxis=new Vector3(1,0,0),_yAxis=new Vector3(0,1,0),_zAxis=new Vector3(0,0,1),_addedEvent={type:"added"},_removedEvent={type:"removed"};class Object3D extends EventDispatcher{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_object3DId++}),this.uuid=generateUUID(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Object3D.DEFAULT_UP.clone();const e=new Vector3,t=new Euler,r=new Quaternion,s=new Vector3(1,1,1);function a(){r.setFromEuler(t,!1)}function o(){t.setFromQuaternion(r,void 0,!1)}t._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Matrix4},normalMatrix:{value:new Matrix3}}),this.matrix=new Matrix4,this.matrixWorld=new Matrix4,this.matrixAutoUpdate=Object3D.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Layers,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _q1.setFromAxisAngle(e,t),this.quaternion.multiply(_q1),this}rotateOnWorldAxis(e,t){return _q1.setFromAxisAngle(e,t),this.quaternion.premultiply(_q1),this}rotateX(e){return this.rotateOnAxis(_xAxis,e)}rotateY(e){return this.rotateOnAxis(_yAxis,e)}rotateZ(e){return this.rotateOnAxis(_zAxis,e)}translateOnAxis(e,t){return _v1$4.copy(e).applyQuaternion(this.quaternion),this.position.add(_v1$4.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_xAxis,e)}translateY(e){return this.translateOnAxis(_yAxis,e)}translateZ(e){return this.translateOnAxis(_zAxis,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_m1$1.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?_target.copy(e):_target.set(e,t,r);const s=this.parent;this.updateWorldMatrix(!0,!1),_position$3.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_m1$1.lookAt(_position$3,_target,this.up):_m1$1.lookAt(_target,_position$3,this.up),this.quaternion.setFromRotationMatrix(_m1$1),s&&(_m1$1.extractRotation(s.matrixWorld),_q1.setFromRotationMatrix(_m1$1),this.quaternion.premultiply(_q1.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(_addedEvent)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(_removedEvent)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_m1$1.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_m1$1.multiply(e.parent.matrixWorld)),e.applyMatrix4(_m1$1),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,s=this.children.length;r<s;r++){const o=this.children[r].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_position$3,e,_scale$2),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_position$3,_quaternion$2,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,s=t.length;r<s;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,s=t.length;r<s;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,s=t.length;r<s;r++){const a=t[r];(a.matrixWorldAutoUpdate===!0||e===!0)&&a.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++){const l=s[a];l.matrixWorldAutoUpdate===!0&&l.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const c=l.shapes;if(Array.isArray(c))for(let u=0,h=c.length;u<h;u++){const f=c[u];a(e.shapes,f)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let c=0,u=this.material.length;c<u;c++)l.push(a(e.materials,this.material[c]));s.material=l}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){const c=this.animations[l];s.animations.push(a(e.animations,c))}}if(t){const l=o(e.geometries),c=o(e.materials),u=o(e.textures),h=o(e.images),f=o(e.shapes),p=o(e.skeletons),_=o(e.animations),x=o(e.nodes);l.length>0&&(r.geometries=l),c.length>0&&(r.materials=c),u.length>0&&(r.textures=u),h.length>0&&(r.images=h),f.length>0&&(r.shapes=f),p.length>0&&(r.skeletons=p),_.length>0&&(r.animations=_),x.length>0&&(r.nodes=x)}return r.object=s,r;function o(l){const c=[];for(const u in l){const h=l[u];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const s=e.children[r];this.add(s.clone())}return this}}Object3D.DEFAULT_UP=new Vector3(0,1,0);Object3D.DEFAULT_MATRIX_AUTO_UPDATE=!0;Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _v0$1=new Vector3,_v1$3=new Vector3,_v2$2=new Vector3,_v3$1=new Vector3,_vab=new Vector3,_vac=new Vector3,_vbc=new Vector3,_vap=new Vector3,_vbp=new Vector3,_vcp=new Vector3;let warnedGetUV=!1;class Triangle{constructor(e=new Vector3,t=new Vector3,r=new Vector3){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,s){s.subVectors(r,t),_v0$1.subVectors(e,t),s.cross(_v0$1);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,r,s,a){_v0$1.subVectors(s,t),_v1$3.subVectors(r,t),_v2$2.subVectors(e,t);const o=_v0$1.dot(_v0$1),l=_v0$1.dot(_v1$3),c=_v0$1.dot(_v2$2),u=_v1$3.dot(_v1$3),h=_v1$3.dot(_v2$2),f=o*u-l*l;if(f===0)return a.set(0,0,0),null;const p=1/f,_=(u*c-l*h)*p,x=(o*h-l*c)*p;return a.set(1-_-x,x,_)}static containsPoint(e,t,r,s){return this.getBarycoord(e,t,r,s,_v3$1)===null?!1:_v3$1.x>=0&&_v3$1.y>=0&&_v3$1.x+_v3$1.y<=1}static getUV(e,t,r,s,a,o,l,c){return warnedGetUV===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),warnedGetUV=!0),this.getInterpolation(e,t,r,s,a,o,l,c)}static getInterpolation(e,t,r,s,a,o,l,c){return this.getBarycoord(e,t,r,s,_v3$1)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,_v3$1.x),c.addScaledVector(o,_v3$1.y),c.addScaledVector(l,_v3$1.z),c)}static isFrontFacing(e,t,r,s){return _v0$1.subVectors(r,t),_v1$3.subVectors(e,t),_v0$1.cross(_v1$3).dot(s)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,s){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,r,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _v0$1.subVectors(this.c,this.b),_v1$3.subVectors(this.a,this.b),_v0$1.cross(_v1$3).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Triangle.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Triangle.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,r,s,a){return warnedGetUV===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),warnedGetUV=!0),Triangle.getInterpolation(e,this.a,this.b,this.c,t,r,s,a)}getInterpolation(e,t,r,s,a){return Triangle.getInterpolation(e,this.a,this.b,this.c,t,r,s,a)}containsPoint(e){return Triangle.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Triangle.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,s=this.b,a=this.c;let o,l;_vab.subVectors(s,r),_vac.subVectors(a,r),_vap.subVectors(e,r);const c=_vab.dot(_vap),u=_vac.dot(_vap);if(c<=0&&u<=0)return t.copy(r);_vbp.subVectors(e,s);const h=_vab.dot(_vbp),f=_vac.dot(_vbp);if(h>=0&&f<=h)return t.copy(s);const p=c*f-h*u;if(p<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(r).addScaledVector(_vab,o);_vcp.subVectors(e,a);const _=_vab.dot(_vcp),x=_vac.dot(_vcp);if(x>=0&&_<=x)return t.copy(a);const g=_*u-c*x;if(g<=0&&u>=0&&x<=0)return l=u/(u-x),t.copy(r).addScaledVector(_vac,l);const d=h*x-_*f;if(d<=0&&f-h>=0&&_-x>=0)return _vbc.subVectors(a,s),l=(f-h)/(f-h+(_-x)),t.copy(s).addScaledVector(_vbc,l);const m=1/(d+g+p);return o=g*m,l=p*m,t.copy(r).addScaledVector(_vab,o).addScaledVector(_vac,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const _colorKeywords={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_hslA={h:0,s:0,l:0},_hslB={h:0,s:0,l:0};function hue2rgb(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Color{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=SRGBColorSpace){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ColorManagement.toWorkingColorSpace(this,t),this}setRGB(e,t,r,s=ColorManagement.workingColorSpace){return this.r=e,this.g=t,this.b=r,ColorManagement.toWorkingColorSpace(this,s),this}setHSL(e,t,r,s=ColorManagement.workingColorSpace){if(e=euclideanModulo(e,1),t=clamp(t,0,1),r=clamp(r,0,1),t===0)this.r=this.g=this.b=r;else{const a=r<=.5?r*(1+t):r+t-r*t,o=2*r-a;this.r=hue2rgb(o,a,e+1/3),this.g=hue2rgb(o,a,e),this.b=hue2rgb(o,a,e-1/3)}return ColorManagement.toWorkingColorSpace(this,s),this}setStyle(e,t=SRGBColorSpace){function r(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=s[1],l=s[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return r(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return r(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return r(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=SRGBColorSpace){const r=_colorKeywords[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=SRGBToLinear(e.r),this.g=SRGBToLinear(e.g),this.b=SRGBToLinear(e.b),this}copyLinearToSRGB(e){return this.r=LinearToSRGB(e.r),this.g=LinearToSRGB(e.g),this.b=LinearToSRGB(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=SRGBColorSpace){return ColorManagement.fromWorkingColorSpace(_color.copy(this),e),Math.round(clamp(_color.r*255,0,255))*65536+Math.round(clamp(_color.g*255,0,255))*256+Math.round(clamp(_color.b*255,0,255))}getHexString(e=SRGBColorSpace){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ColorManagement.workingColorSpace){ColorManagement.fromWorkingColorSpace(_color.copy(this),t);const r=_color.r,s=_color.g,a=_color.b,o=Math.max(r,s,a),l=Math.min(r,s,a);let c,u;const h=(l+o)/2;if(l===o)c=0,u=0;else{const f=o-l;switch(u=h<=.5?f/(o+l):f/(2-o-l),o){case r:c=(s-a)/f+(s<a?6:0);break;case s:c=(a-r)/f+2;break;case a:c=(r-s)/f+4;break}c/=6}return e.h=c,e.s=u,e.l=h,e}getRGB(e,t=ColorManagement.workingColorSpace){return ColorManagement.fromWorkingColorSpace(_color.copy(this),t),e.r=_color.r,e.g=_color.g,e.b=_color.b,e}getStyle(e=SRGBColorSpace){ColorManagement.fromWorkingColorSpace(_color.copy(this),e);const t=_color.r,r=_color.g,s=_color.b;return e!==SRGBColorSpace?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(s*255)})`}offsetHSL(e,t,r){return this.getHSL(_hslA),this.setHSL(_hslA.h+e,_hslA.s+t,_hslA.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(_hslA),e.getHSL(_hslB);const r=lerp(_hslA.h,_hslB.h,t),s=lerp(_hslA.s,_hslB.s,t),a=lerp(_hslA.l,_hslB.l,t);return this.setHSL(r,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*r+a[6]*s,this.g=a[1]*t+a[4]*r+a[7]*s,this.b=a[2]*t+a[5]*r+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _color=new Color;Color.NAMES=_colorKeywords;let _materialId=0;class Material extends EventDispatcher{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_materialId++}),this.uuid=generateUUID(),this.name="",this.type="Material",this.blending=NormalBlending,this.side=FrontSide,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=SrcAlphaFactor,this.blendDst=OneMinusSrcAlphaFactor,this.blendEquation=AddEquation,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Color(0,0,0),this.blendAlpha=0,this.depthFunc=LessEqualDepth,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=AlwaysStencilFunc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=KeepStencilOp,this.stencilZFail=KeepStencilOp,this.stencilZPass=KeepStencilOp,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(r):s&&s.isVector3&&r&&r.isVector3?s.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==NormalBlending&&(r.blending=this.blending),this.side!==FrontSide&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==SrcAlphaFactor&&(r.blendSrc=this.blendSrc),this.blendDst!==OneMinusSrcAlphaFactor&&(r.blendDst=this.blendDst),this.blendEquation!==AddEquation&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==LessEqualDepth&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==AlwaysStencilFunc&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==KeepStencilOp&&(r.stencilFail=this.stencilFail),this.stencilZFail!==KeepStencilOp&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==KeepStencilOp&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function s(a){const o=[];for(const l in a){const c=a[l];delete c.metadata,o.push(c)}return o}if(t){const a=s(e.textures),o=s(e.images);a.length>0&&(r.textures=a),o.length>0&&(r.images=o)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const s=t.length;r=new Array(s);for(let a=0;a!==s;++a)r[a]=t[a].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class MeshBasicMaterial extends Material{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Color(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=MultiplyOperation,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _vector$9=new Vector3,_vector2$1=new Vector2;class BufferAttribute{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=StaticDrawUsage,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=FloatType,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[r+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)_vector2$1.fromBufferAttribute(this,t),_vector2$1.applyMatrix3(e),this.setXY(t,_vector2$1.x,_vector2$1.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)_vector$9.fromBufferAttribute(this,t),_vector$9.applyMatrix3(e),this.setXYZ(t,_vector$9.x,_vector$9.y,_vector$9.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)_vector$9.fromBufferAttribute(this,t),_vector$9.applyMatrix4(e),this.setXYZ(t,_vector$9.x,_vector$9.y,_vector$9.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)_vector$9.fromBufferAttribute(this,t),_vector$9.applyNormalMatrix(e),this.setXYZ(t,_vector$9.x,_vector$9.y,_vector$9.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)_vector$9.fromBufferAttribute(this,t),_vector$9.transformDirection(e),this.setXYZ(t,_vector$9.x,_vector$9.y,_vector$9.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=denormalize(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=normalize(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=denormalize(t,this.array)),t}setX(e,t){return this.normalized&&(t=normalize(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=denormalize(t,this.array)),t}setY(e,t){return this.normalized&&(t=normalize(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=denormalize(t,this.array)),t}setZ(e,t){return this.normalized&&(t=normalize(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=denormalize(t,this.array)),t}setW(e,t){return this.normalized&&(t=normalize(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=normalize(t,this.array),r=normalize(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,s){return e*=this.itemSize,this.normalized&&(t=normalize(t,this.array),r=normalize(r,this.array),s=normalize(s,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=s,this}setXYZW(e,t,r,s,a){return e*=this.itemSize,this.normalized&&(t=normalize(t,this.array),r=normalize(r,this.array),s=normalize(s,this.array),a=normalize(a,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==StaticDrawUsage&&(e.usage=this.usage),e}}class Uint16BufferAttribute extends BufferAttribute{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Uint32BufferAttribute extends BufferAttribute{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class Float32BufferAttribute extends BufferAttribute{constructor(e,t,r){super(new Float32Array(e),t,r)}}let _id$2=0;const _m1=new Matrix4,_obj=new Object3D,_offset=new Vector3,_box$2=new Box3,_boxMorphTargets=new Box3,_vector$8=new Vector3;class BufferGeometry extends EventDispatcher{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_id$2++}),this.uuid=generateUUID(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(arrayNeedsUint32(e)?Uint32BufferAttribute:Uint16BufferAttribute)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const a=new Matrix3().getNormalMatrix(e);r.applyNormalMatrix(a),r.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _m1.makeRotationFromQuaternion(e),this.applyMatrix4(_m1),this}rotateX(e){return _m1.makeRotationX(e),this.applyMatrix4(_m1),this}rotateY(e){return _m1.makeRotationY(e),this.applyMatrix4(_m1),this}rotateZ(e){return _m1.makeRotationZ(e),this.applyMatrix4(_m1),this}translate(e,t,r){return _m1.makeTranslation(e,t,r),this.applyMatrix4(_m1),this}scale(e,t,r){return _m1.makeScale(e,t,r),this.applyMatrix4(_m1),this}lookAt(e){return _obj.lookAt(e),_obj.updateMatrix(),this.applyMatrix4(_obj.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_offset).negate(),this.translate(_offset.x,_offset.y,_offset.z),this}setFromPoints(e){const t=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new Float32BufferAttribute(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Box3);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new Vector3(-1/0,-1/0,-1/0),new Vector3(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const a=t[r];_box$2.setFromBufferAttribute(a),this.morphTargetsRelative?(_vector$8.addVectors(this.boundingBox.min,_box$2.min),this.boundingBox.expandByPoint(_vector$8),_vector$8.addVectors(this.boundingBox.max,_box$2.max),this.boundingBox.expandByPoint(_vector$8)):(this.boundingBox.expandByPoint(_box$2.min),this.boundingBox.expandByPoint(_box$2.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sphere);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new Vector3,1/0);return}if(e){const r=this.boundingSphere.center;if(_box$2.setFromBufferAttribute(e),t)for(let a=0,o=t.length;a<o;a++){const l=t[a];_boxMorphTargets.setFromBufferAttribute(l),this.morphTargetsRelative?(_vector$8.addVectors(_box$2.min,_boxMorphTargets.min),_box$2.expandByPoint(_vector$8),_vector$8.addVectors(_box$2.max,_boxMorphTargets.max),_box$2.expandByPoint(_vector$8)):(_box$2.expandByPoint(_boxMorphTargets.min),_box$2.expandByPoint(_boxMorphTargets.max))}_box$2.getCenter(r);let s=0;for(let a=0,o=e.count;a<o;a++)_vector$8.fromBufferAttribute(e,a),s=Math.max(s,r.distanceToSquared(_vector$8));if(t)for(let a=0,o=t.length;a<o;a++){const l=t[a],c=this.morphTargetsRelative;for(let u=0,h=l.count;u<h;u++)_vector$8.fromBufferAttribute(l,u),c&&(_offset.fromBufferAttribute(e,u),_vector$8.add(_offset)),s=Math.max(s,r.distanceToSquared(_vector$8))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=e.array,s=t.position.array,a=t.normal.array,o=t.uv.array,l=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new BufferAttribute(new Float32Array(4*l),4));const c=this.getAttribute("tangent").array,u=[],h=[];for(let A=0;A<l;A++)u[A]=new Vector3,h[A]=new Vector3;const f=new Vector3,p=new Vector3,_=new Vector3,x=new Vector2,g=new Vector2,d=new Vector2,m=new Vector3,b=new Vector3;function E(A,V,H){f.fromArray(s,A*3),p.fromArray(s,V*3),_.fromArray(s,H*3),x.fromArray(o,A*2),g.fromArray(o,V*2),d.fromArray(o,H*2),p.sub(f),_.sub(f),g.sub(x),d.sub(x);const ne=1/(g.x*d.y-d.x*g.y);isFinite(ne)&&(m.copy(p).multiplyScalar(d.y).addScaledVector(_,-g.y).multiplyScalar(ne),b.copy(_).multiplyScalar(g.x).addScaledVector(p,-d.x).multiplyScalar(ne),u[A].add(m),u[V].add(m),u[H].add(m),h[A].add(b),h[V].add(b),h[H].add(b))}let T=this.groups;T.length===0&&(T=[{start:0,count:r.length}]);for(let A=0,V=T.length;A<V;++A){const H=T[A],ne=H.start,L=H.count;for(let B=ne,G=ne+L;B<G;B+=3)E(r[B+0],r[B+1],r[B+2])}const P=new Vector3,C=new Vector3,w=new Vector3,Y=new Vector3;function y(A){w.fromArray(a,A*3),Y.copy(w);const V=u[A];P.copy(V),P.sub(w.multiplyScalar(w.dot(V))).normalize(),C.crossVectors(Y,V);const ne=C.dot(h[A])<0?-1:1;c[A*4]=P.x,c[A*4+1]=P.y,c[A*4+2]=P.z,c[A*4+3]=ne}for(let A=0,V=T.length;A<V;++A){const H=T[A],ne=H.start,L=H.count;for(let B=ne,G=ne+L;B<G;B+=3)y(r[B+0]),y(r[B+1]),y(r[B+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new BufferAttribute(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let p=0,_=r.count;p<_;p++)r.setXYZ(p,0,0,0);const s=new Vector3,a=new Vector3,o=new Vector3,l=new Vector3,c=new Vector3,u=new Vector3,h=new Vector3,f=new Vector3;if(e)for(let p=0,_=e.count;p<_;p+=3){const x=e.getX(p+0),g=e.getX(p+1),d=e.getX(p+2);s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),o.fromBufferAttribute(t,d),h.subVectors(o,a),f.subVectors(s,a),h.cross(f),l.fromBufferAttribute(r,x),c.fromBufferAttribute(r,g),u.fromBufferAttribute(r,d),l.add(h),c.add(h),u.add(h),r.setXYZ(x,l.x,l.y,l.z),r.setXYZ(g,c.x,c.y,c.z),r.setXYZ(d,u.x,u.y,u.z)}else for(let p=0,_=t.count;p<_;p+=3)s.fromBufferAttribute(t,p+0),a.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),h.subVectors(o,a),f.subVectors(s,a),h.cross(f),r.setXYZ(p+0,h.x,h.y,h.z),r.setXYZ(p+1,h.x,h.y,h.z),r.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)_vector$8.fromBufferAttribute(e,t),_vector$8.normalize(),e.setXYZ(t,_vector$8.x,_vector$8.y,_vector$8.z)}toNonIndexed(){function e(l,c){const u=l.array,h=l.itemSize,f=l.normalized,p=new u.constructor(c.length*h);let _=0,x=0;for(let g=0,d=c.length;g<d;g++){l.isInterleavedBufferAttribute?_=c[g]*l.data.stride+l.offset:_=c[g]*h;for(let m=0;m<h;m++)p[x++]=u[_++]}return new BufferAttribute(p,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new BufferGeometry,r=this.index.array,s=this.attributes;for(const l in s){const c=s[l],u=e(c,r);t.setAttribute(l,u)}const a=this.morphAttributes;for(const l in a){const c=[],u=a[l];for(let h=0,f=u.length;h<f;h++){const p=u[h],_=e(p,r);c.push(_)}t.morphAttributes[l]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let l=0,c=o.length;l<c;l++){const u=o[l];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const u in c)c[u]!==void 0&&(e[u]=c[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const c in r){const u=r[c];e.data.attributes[c]=u.toJSON(e.data)}const s={};let a=!1;for(const c in this.morphAttributes){const u=this.morphAttributes[c],h=[];for(let f=0,p=u.length;f<p;f++){const _=u[f];h.push(_.toJSON(e.data))}h.length>0&&(s[c]=h,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const s=e.attributes;for(const u in s){const h=s[u];this.setAttribute(u,h.clone(t))}const a=e.morphAttributes;for(const u in a){const h=[],f=a[u];for(let p=0,_=f.length;p<_;p++)h.push(f[p].clone(t));this.morphAttributes[u]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,h=o.length;u<h;u++){const f=o[u];this.addGroup(f.start,f.count,f.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _inverseMatrix$3=new Matrix4,_ray$3=new Ray,_sphere$6=new Sphere,_sphereHitAt=new Vector3,_vA$1=new Vector3,_vB$1=new Vector3,_vC$1=new Vector3,_tempA=new Vector3,_morphA=new Vector3,_uvA$1=new Vector2,_uvB$1=new Vector2,_uvC$1=new Vector2,_normalA=new Vector3,_normalB=new Vector3,_normalC=new Vector3,_intersectionPoint=new Vector3,_intersectionPointWorld=new Vector3;class Mesh extends Object3D{constructor(e=new BufferGeometry,t=new MeshBasicMaterial){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const s=t[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const l=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}getVertexPosition(e,t){const r=this.geometry,s=r.attributes.position,a=r.morphAttributes.position,o=r.morphTargetsRelative;t.fromBufferAttribute(s,e);const l=this.morphTargetInfluences;if(a&&l){_morphA.set(0,0,0);for(let c=0,u=a.length;c<u;c++){const h=l[c],f=a[c];h!==0&&(_tempA.fromBufferAttribute(f,e),o?_morphA.addScaledVector(_tempA,h):_morphA.addScaledVector(_tempA.sub(t),h))}t.add(_morphA)}return t}raycast(e,t){const r=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),_sphere$6.copy(r.boundingSphere),_sphere$6.applyMatrix4(a),_ray$3.copy(e.ray).recast(e.near),!(_sphere$6.containsPoint(_ray$3.origin)===!1&&(_ray$3.intersectSphere(_sphere$6,_sphereHitAt)===null||_ray$3.origin.distanceToSquared(_sphereHitAt)>(e.far-e.near)**2))&&(_inverseMatrix$3.copy(a).invert(),_ray$3.copy(e.ray).applyMatrix4(_inverseMatrix$3),!(r.boundingBox!==null&&_ray$3.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,_ray$3)))}_computeIntersections(e,t,r){let s;const a=this.geometry,o=this.material,l=a.index,c=a.attributes.position,u=a.attributes.uv,h=a.attributes.uv1,f=a.attributes.normal,p=a.groups,_=a.drawRange;if(l!==null)if(Array.isArray(o))for(let x=0,g=p.length;x<g;x++){const d=p[x],m=o[d.materialIndex],b=Math.max(d.start,_.start),E=Math.min(l.count,Math.min(d.start+d.count,_.start+_.count));for(let T=b,P=E;T<P;T+=3){const C=l.getX(T),w=l.getX(T+1),Y=l.getX(T+2);s=checkGeometryIntersection(this,m,e,r,u,h,f,C,w,Y),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{const x=Math.max(0,_.start),g=Math.min(l.count,_.start+_.count);for(let d=x,m=g;d<m;d+=3){const b=l.getX(d),E=l.getX(d+1),T=l.getX(d+2);s=checkGeometryIntersection(this,o,e,r,u,h,f,b,E,T),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,g=p.length;x<g;x++){const d=p[x],m=o[d.materialIndex],b=Math.max(d.start,_.start),E=Math.min(c.count,Math.min(d.start+d.count,_.start+_.count));for(let T=b,P=E;T<P;T+=3){const C=T,w=T+1,Y=T+2;s=checkGeometryIntersection(this,m,e,r,u,h,f,C,w,Y),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{const x=Math.max(0,_.start),g=Math.min(c.count,_.start+_.count);for(let d=x,m=g;d<m;d+=3){const b=d,E=d+1,T=d+2;s=checkGeometryIntersection(this,o,e,r,u,h,f,b,E,T),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}}}function checkIntersection(n,e,t,r,s,a,o,l){let c;if(e.side===BackSide?c=r.intersectTriangle(o,a,s,!0,l):c=r.intersectTriangle(s,a,o,e.side===FrontSide,l),c===null)return null;_intersectionPointWorld.copy(l),_intersectionPointWorld.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(_intersectionPointWorld);return u<t.near||u>t.far?null:{distance:u,point:_intersectionPointWorld.clone(),object:n}}function checkGeometryIntersection(n,e,t,r,s,a,o,l,c,u){n.getVertexPosition(l,_vA$1),n.getVertexPosition(c,_vB$1),n.getVertexPosition(u,_vC$1);const h=checkIntersection(n,e,t,r,_vA$1,_vB$1,_vC$1,_intersectionPoint);if(h){s&&(_uvA$1.fromBufferAttribute(s,l),_uvB$1.fromBufferAttribute(s,c),_uvC$1.fromBufferAttribute(s,u),h.uv=Triangle.getInterpolation(_intersectionPoint,_vA$1,_vB$1,_vC$1,_uvA$1,_uvB$1,_uvC$1,new Vector2)),a&&(_uvA$1.fromBufferAttribute(a,l),_uvB$1.fromBufferAttribute(a,c),_uvC$1.fromBufferAttribute(a,u),h.uv1=Triangle.getInterpolation(_intersectionPoint,_vA$1,_vB$1,_vC$1,_uvA$1,_uvB$1,_uvC$1,new Vector2),h.uv2=h.uv1),o&&(_normalA.fromBufferAttribute(o,l),_normalB.fromBufferAttribute(o,c),_normalC.fromBufferAttribute(o,u),h.normal=Triangle.getInterpolation(_intersectionPoint,_vA$1,_vB$1,_vC$1,_normalA,_normalB,_normalC,new Vector3),h.normal.dot(r.direction)>0&&h.normal.multiplyScalar(-1));const f={a:l,b:c,c:u,normal:new Vector3,materialIndex:0};Triangle.getNormal(_vA$1,_vB$1,_vC$1,f.normal),h.face=f}return h}class BoxGeometry extends BufferGeometry{constructor(e=1,t=1,r=1,s=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:s,heightSegments:a,depthSegments:o};const l=this;s=Math.floor(s),a=Math.floor(a),o=Math.floor(o);const c=[],u=[],h=[],f=[];let p=0,_=0;x("z","y","x",-1,-1,r,t,e,o,a,0),x("z","y","x",1,-1,r,t,-e,o,a,1),x("x","z","y",1,1,e,r,t,s,o,2),x("x","z","y",1,-1,e,r,-t,s,o,3),x("x","y","z",1,-1,e,t,r,s,a,4),x("x","y","z",-1,-1,e,t,-r,s,a,5),this.setIndex(c),this.setAttribute("position",new Float32BufferAttribute(u,3)),this.setAttribute("normal",new Float32BufferAttribute(h,3)),this.setAttribute("uv",new Float32BufferAttribute(f,2));function x(g,d,m,b,E,T,P,C,w,Y,y){const A=T/w,V=P/Y,H=T/2,ne=P/2,L=C/2,B=w+1,G=Y+1;let $=0,z=0;const W=new Vector3;for(let X=0;X<G;X++){const J=X*V-ne;for(let ee=0;ee<B;ee++){const k=ee*A-H;W[g]=k*b,W[d]=J*E,W[m]=L,u.push(W.x,W.y,W.z),W[g]=0,W[d]=0,W[m]=C>0?1:-1,h.push(W.x,W.y,W.z),f.push(ee/w),f.push(1-X/Y),$+=1}}for(let X=0;X<Y;X++)for(let J=0;J<w;J++){const ee=p+J+B*X,k=p+J+B*(X+1),q=p+(J+1)+B*(X+1),ae=p+(J+1)+B*X;c.push(ee,k,ae),c.push(k,q,ae),z+=6}l.addGroup(_,z,y),_+=z,p+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new BoxGeometry(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function cloneUniforms(n){const e={};for(const t in n){e[t]={};for(const r in n[t]){const s=n[t][r];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=s.clone():Array.isArray(s)?e[t][r]=s.slice():e[t][r]=s}}return e}function mergeUniforms(n){const e={};for(let t=0;t<n.length;t++){const r=cloneUniforms(n[t]);for(const s in r)e[s]=r[s]}return e}function cloneUniformsGroups(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function getUnlitUniformColorSpace(n){return n.getRenderTarget()===null?n.outputColorSpace:ColorManagement.workingColorSpace}const UniformsUtils={clone:cloneUniforms,merge:mergeUniforms};var default_vertex=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,default_fragment=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ShaderMaterial extends Material{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=default_vertex,this.fragmentShader=default_fragment,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cloneUniforms(e.uniforms),this.uniformsGroups=cloneUniformsGroups(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const s in this.extensions)this.extensions[s]===!0&&(r[s]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class Camera extends Object3D{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Matrix4,this.projectionMatrix=new Matrix4,this.projectionMatrixInverse=new Matrix4,this.coordinateSystem=WebGLCoordinateSystem}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class PerspectiveCamera extends Camera{constructor(e=50,t=1,r=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=RAD2DEG*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(DEG2RAD*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return RAD2DEG*2*Math.atan(Math.tan(DEG2RAD*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,r,s,a,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=s,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(DEG2RAD*.5*this.fov)/this.zoom,r=2*t,s=this.aspect*r,a=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,u=o.fullHeight;a+=o.offsetX*s/c,t-=o.offsetY*r/u,s*=o.width/c,r*=o.height/u}const l=this.filmOffset;l!==0&&(a+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fov=-90,aspect=1;class CubeCamera extends Object3D{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new PerspectiveCamera(fov,aspect,e,t);s.layers=this.layers,this.add(s);const a=new PerspectiveCamera(fov,aspect,e,t);a.layers=this.layers,this.add(a);const o=new PerspectiveCamera(fov,aspect,e,t);o.layers=this.layers,this.add(o);const l=new PerspectiveCamera(fov,aspect,e,t);l.layers=this.layers,this.add(l);const c=new PerspectiveCamera(fov,aspect,e,t);c.layers=this.layers,this.add(c);const u=new PerspectiveCamera(fov,aspect,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,s,a,o,l,c]=t;for(const u of t)this.remove(u);if(e===WebGLCoordinateSystem)r.up.set(0,1,0),r.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===WebGPUCoordinateSystem)r.up.set(0,-1,0),r.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,l,c,u,h]=this.children,f=e.getRenderTarget(),p=e.getActiveCubeFace(),_=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const g=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,s),e.render(t,a),e.setRenderTarget(r,1,s),e.render(t,o),e.setRenderTarget(r,2,s),e.render(t,l),e.setRenderTarget(r,3,s),e.render(t,c),e.setRenderTarget(r,4,s),e.render(t,u),r.texture.generateMipmaps=g,e.setRenderTarget(r,5,s),e.render(t,h),e.setRenderTarget(f,p,_),e.xr.enabled=x,r.texture.needsPMREMUpdate=!0}}class CubeTexture extends Texture{constructor(e,t,r,s,a,o,l,c,u,h){e=e!==void 0?e:[],t=t!==void 0?t:CubeReflectionMapping,super(e,t,r,s,a,o,l,c,u,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class WebGLCubeRenderTarget extends WebGLRenderTarget{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},s=[r,r,r,r,r,r];t.encoding!==void 0&&(warnOnce("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===sRGBEncoding?SRGBColorSpace:NoColorSpace),this.texture=new CubeTexture(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:LinearFilter}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new BoxGeometry(5,5,5),a=new ShaderMaterial({name:"CubemapFromEquirect",uniforms:cloneUniforms(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:BackSide,blending:NoBlending});a.uniforms.tEquirect.value=t;const o=new Mesh(s,a),l=t.minFilter;return t.minFilter===LinearMipmapLinearFilter&&(t.minFilter=LinearFilter),new CubeCamera(1,10,this).update(e,o),t.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,r,s){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,r,s);e.setRenderTarget(a)}}const _vector1=new Vector3,_vector2=new Vector3,_normalMatrix=new Matrix3;class Plane{constructor(e=new Vector3(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,s){return this.normal.set(e,t,r),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const s=_vector1.subVectors(r,t).cross(_vector2.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(_vector1),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||_normalMatrix.getNormalMatrix(e),s=this.coplanarPoint(_vector1).applyMatrix4(e),a=this.normal.applyMatrix3(r).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _sphere$5=new Sphere,_vector$7=new Vector3;class Frustum{constructor(e=new Plane,t=new Plane,r=new Plane,s=new Plane,a=new Plane,o=new Plane){this.planes=[e,t,r,s,a,o]}set(e,t,r,s,a,o){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(r),l[3].copy(s),l[4].copy(a),l[5].copy(o),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=WebGLCoordinateSystem){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],f=s[6],p=s[7],_=s[8],x=s[9],g=s[10],d=s[11],m=s[12],b=s[13],E=s[14],T=s[15];if(r[0].setComponents(c-a,p-u,d-_,T-m).normalize(),r[1].setComponents(c+a,p+u,d+_,T+m).normalize(),r[2].setComponents(c+o,p+h,d+x,T+b).normalize(),r[3].setComponents(c-o,p-h,d-x,T-b).normalize(),r[4].setComponents(c-l,p-f,d-g,T-E).normalize(),t===WebGLCoordinateSystem)r[5].setComponents(c+l,p+f,d+g,T+E).normalize();else if(t===WebGPUCoordinateSystem)r[5].setComponents(l,f,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_sphere$5.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_sphere$5.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_sphere$5)}intersectsSprite(e){return _sphere$5.center.set(0,0,0),_sphere$5.radius=.7071067811865476,_sphere$5.applyMatrix4(e.matrixWorld),this.intersectsSphere(_sphere$5)}intersectsSphere(e){const t=this.planes,r=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(r)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const s=t[r];if(_vector$7.x=s.normal.x>0?e.max.x:e.min.x,_vector$7.y=s.normal.y>0?e.max.y:e.min.y,_vector$7.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(_vector$7)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function WebGLAnimation(){let n=null,e=!1,t=null,r=null;function s(a,o){t(a,o),r=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(r=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function WebGLAttributes(n,e){const t=e.isWebGL2,r=new WeakMap;function s(u,h){const f=u.array,p=u.usage,_=f.byteLength,x=n.createBuffer();n.bindBuffer(h,x),n.bufferData(h,f,p),u.onUploadCallback();let g;if(f instanceof Float32Array)g=n.FLOAT;else if(f instanceof Uint16Array)if(u.isFloat16BufferAttribute)if(t)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)g=n.SHORT;else if(f instanceof Uint32Array)g=n.UNSIGNED_INT;else if(f instanceof Int32Array)g=n.INT;else if(f instanceof Int8Array)g=n.BYTE;else if(f instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:x,type:g,bytesPerElement:f.BYTES_PER_ELEMENT,version:u.version,size:_}}function a(u,h,f){const p=h.array,_=h._updateRange,x=h.updateRanges;if(n.bindBuffer(f,u),_.count===-1&&x.length===0&&n.bufferSubData(f,0,p),x.length!==0){for(let g=0,d=x.length;g<d;g++){const m=x[g];t?n.bufferSubData(f,m.start*p.BYTES_PER_ELEMENT,p,m.start,m.count):n.bufferSubData(f,m.start*p.BYTES_PER_ELEMENT,p.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}_.count!==-1&&(t?n.bufferSubData(f,_.offset*p.BYTES_PER_ELEMENT,p,_.offset,_.count):n.bufferSubData(f,_.offset*p.BYTES_PER_ELEMENT,p.subarray(_.offset,_.offset+_.count)),_.count=-1),h.onUploadCallback()}function o(u){return u.isInterleavedBufferAttribute&&(u=u.data),r.get(u)}function l(u){u.isInterleavedBufferAttribute&&(u=u.data);const h=r.get(u);h&&(n.deleteBuffer(h.buffer),r.delete(u))}function c(u,h){if(u.isGLBufferAttribute){const p=r.get(u);(!p||p.version<u.version)&&r.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}u.isInterleavedBufferAttribute&&(u=u.data);const f=r.get(u);if(f===void 0)r.set(u,s(u,h));else if(f.version<u.version){if(f.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(f.buffer,u,h),f.version=u.version}}return{get:o,remove:l,update:c}}class PlaneGeometry extends BufferGeometry{constructor(e=1,t=1,r=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:s};const a=e/2,o=t/2,l=Math.floor(r),c=Math.floor(s),u=l+1,h=c+1,f=e/l,p=t/c,_=[],x=[],g=[],d=[];for(let m=0;m<h;m++){const b=m*p-o;for(let E=0;E<u;E++){const T=E*f-a;x.push(T,-b,0),g.push(0,0,1),d.push(E/l),d.push(1-m/c)}}for(let m=0;m<c;m++)for(let b=0;b<l;b++){const E=b+u*m,T=b+u*(m+1),P=b+1+u*(m+1),C=b+1+u*m;_.push(E,T,C),_.push(T,P,C)}this.setIndex(_),this.setAttribute("position",new Float32BufferAttribute(x,3)),this.setAttribute("normal",new Float32BufferAttribute(g,3)),this.setAttribute("uv",new Float32BufferAttribute(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new PlaneGeometry(e.width,e.height,e.widthSegments,e.heightSegments)}}var alphahash_fragment=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,alphatest_pars_fragment=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,batching_vertex=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,begin_vertex=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,clipping_planes_pars_fragment=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,common$7=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment="gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,envmap_fragment=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_vertex=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_fragment=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,lightmap_pars_fragment=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,envmap_physical_pars_fragment=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,lights_toon_fragment=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,logdepthbuf_vertex=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,map_fragment=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphcolor_vertex=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,morphtarget_pars_vertex=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,morphtarget_vertex=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,normal_fragment_begin=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,shadowmap_pars_vertex=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vertex$h=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fragment$h=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vertex$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fragment$g=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vertex$f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fragment$f=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vertex$e=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,fragment$e=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,vertex$d=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fragment$d=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vertex$c=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fragment$c=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vertex$b=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fragment$b=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vertex$a=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,fragment$a=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vertex$9=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fragment$9=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vertex$8=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fragment$8=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vertex$7=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fragment$7=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,vertex$6=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fragment$6=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vertex$5=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,fragment$5=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vertex$4=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fragment$4=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vertex$3=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fragment$3=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vertex$2=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fragment$2=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,vertex$1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fragment$1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ShaderChunk={alphahash_fragment,alphahash_pars_fragment,alphamap_fragment,alphamap_pars_fragment,alphatest_fragment,alphatest_pars_fragment,aomap_fragment,aomap_pars_fragment,batching_pars_vertex,batching_vertex,begin_vertex,beginnormal_vertex,bsdfs,iridescence_fragment,bumpmap_pars_fragment,clipping_planes_fragment,clipping_planes_pars_fragment,clipping_planes_pars_vertex,clipping_planes_vertex,color_fragment,color_pars_fragment,color_pars_vertex,color_vertex,common:common$7,cube_uv_reflection_fragment,defaultnormal_vertex,displacementmap_pars_vertex,displacementmap_vertex,emissivemap_fragment,emissivemap_pars_fragment,colorspace_fragment,colorspace_pars_fragment,envmap_fragment,envmap_common_pars_fragment,envmap_pars_fragment,envmap_pars_vertex,envmap_physical_pars_fragment,envmap_vertex,fog_vertex,fog_pars_vertex,fog_fragment,fog_pars_fragment,gradientmap_pars_fragment,lightmap_fragment,lightmap_pars_fragment,lights_lambert_fragment,lights_lambert_pars_fragment,lights_pars_begin,lights_toon_fragment,lights_toon_pars_fragment,lights_phong_fragment,lights_phong_pars_fragment,lights_physical_fragment,lights_physical_pars_fragment,lights_fragment_begin,lights_fragment_maps,lights_fragment_end,logdepthbuf_fragment,logdepthbuf_pars_fragment,logdepthbuf_pars_vertex,logdepthbuf_vertex,map_fragment,map_pars_fragment,map_particle_fragment,map_particle_pars_fragment,metalnessmap_fragment,metalnessmap_pars_fragment,morphcolor_vertex,morphnormal_vertex,morphtarget_pars_vertex,morphtarget_vertex,normal_fragment_begin,normal_fragment_maps,normal_pars_fragment,normal_pars_vertex,normal_vertex,normalmap_pars_fragment,clearcoat_normal_fragment_begin,clearcoat_normal_fragment_maps,clearcoat_pars_fragment,iridescence_pars_fragment,opaque_fragment,packing,premultiplied_alpha_fragment,project_vertex,dithering_fragment,dithering_pars_fragment,roughnessmap_fragment,roughnessmap_pars_fragment,shadowmap_pars_fragment,shadowmap_pars_vertex,shadowmap_vertex,shadowmask_pars_fragment,skinbase_vertex,skinning_pars_vertex,skinning_vertex,skinnormal_vertex,specularmap_fragment,specularmap_pars_fragment,tonemapping_fragment,tonemapping_pars_fragment,transmission_fragment,transmission_pars_fragment,uv_pars_fragment,uv_pars_vertex,uv_vertex,worldpos_vertex,background_vert:vertex$h,background_frag:fragment$h,backgroundCube_vert:vertex$g,backgroundCube_frag:fragment$g,cube_vert:vertex$f,cube_frag:fragment$f,depth_vert:vertex$e,depth_frag:fragment$e,distanceRGBA_vert:vertex$d,distanceRGBA_frag:fragment$d,equirect_vert:vertex$c,equirect_frag:fragment$c,linedashed_vert:vertex$b,linedashed_frag:fragment$b,meshbasic_vert:vertex$a,meshbasic_frag:fragment$a,meshlambert_vert:vertex$9,meshlambert_frag:fragment$9,meshmatcap_vert:vertex$8,meshmatcap_frag:fragment$8,meshnormal_vert:vertex$7,meshnormal_frag:fragment$7,meshphong_vert:vertex$6,meshphong_frag:fragment$6,meshphysical_vert:vertex$5,meshphysical_frag:fragment$5,meshtoon_vert:vertex$4,meshtoon_frag:fragment$4,points_vert:vertex$3,points_frag:fragment$3,shadow_vert:vertex$2,shadow_frag:fragment$2,sprite_vert:vertex$1,sprite_frag:fragment$1},UniformsLib={common:{diffuse:{value:new Color(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Matrix3},alphaMap:{value:null},alphaMapTransform:{value:new Matrix3},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Matrix3}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Matrix3}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Matrix3}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Matrix3},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Matrix3},normalScale:{value:new Vector2(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Matrix3},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Matrix3}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Matrix3}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Matrix3}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Color(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Color(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Matrix3},alphaTest:{value:0},uvTransform:{value:new Matrix3}},sprite:{diffuse:{value:new Color(16777215)},opacity:{value:1},center:{value:new Vector2(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Matrix3},alphaMap:{value:null},alphaMapTransform:{value:new Matrix3},alphaTest:{value:0}}},ShaderLib={basic:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.fog]),vertexShader:ShaderChunk.meshbasic_vert,fragmentShader:ShaderChunk.meshbasic_frag},lambert:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color(0)}}]),vertexShader:ShaderChunk.meshlambert_vert,fragmentShader:ShaderChunk.meshlambert_frag},phong:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color(0)},specular:{value:new Color(1118481)},shininess:{value:30}}]),vertexShader:ShaderChunk.meshphong_vert,fragmentShader:ShaderChunk.meshphong_frag},standard:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.roughnessmap,UniformsLib.metalnessmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ShaderChunk.meshphysical_vert,fragmentShader:ShaderChunk.meshphysical_frag},toon:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.gradientmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color(0)}}]),vertexShader:ShaderChunk.meshtoon_vert,fragmentShader:ShaderChunk.meshtoon_frag},matcap:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.fog,{matcap:{value:null}}]),vertexShader:ShaderChunk.meshmatcap_vert,fragmentShader:ShaderChunk.meshmatcap_frag},points:{uniforms:mergeUniforms([UniformsLib.points,UniformsLib.fog]),vertexShader:ShaderChunk.points_vert,fragmentShader:ShaderChunk.points_frag},dashed:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ShaderChunk.linedashed_vert,fragmentShader:ShaderChunk.linedashed_frag},depth:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.displacementmap]),vertexShader:ShaderChunk.depth_vert,fragmentShader:ShaderChunk.depth_frag},normal:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,{opacity:{value:1}}]),vertexShader:ShaderChunk.meshnormal_vert,fragmentShader:ShaderChunk.meshnormal_frag},sprite:{uniforms:mergeUniforms([UniformsLib.sprite,UniformsLib.fog]),vertexShader:ShaderChunk.sprite_vert,fragmentShader:ShaderChunk.sprite_frag},background:{uniforms:{uvTransform:{value:new Matrix3},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ShaderChunk.background_vert,fragmentShader:ShaderChunk.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ShaderChunk.backgroundCube_vert,fragmentShader:ShaderChunk.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ShaderChunk.cube_vert,fragmentShader:ShaderChunk.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ShaderChunk.equirect_vert,fragmentShader:ShaderChunk.equirect_frag},distanceRGBA:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.displacementmap,{referencePosition:{value:new Vector3},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ShaderChunk.distanceRGBA_vert,fragmentShader:ShaderChunk.distanceRGBA_frag},shadow:{uniforms:mergeUniforms([UniformsLib.lights,UniformsLib.fog,{color:{value:new Color(0)},opacity:{value:1}}]),vertexShader:ShaderChunk.shadow_vert,fragmentShader:ShaderChunk.shadow_frag}};ShaderLib.physical={uniforms:mergeUniforms([ShaderLib.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Matrix3},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Matrix3},clearcoatNormalScale:{value:new Vector2(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Matrix3},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Matrix3},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Matrix3},sheen:{value:0},sheenColor:{value:new Color(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Matrix3},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Matrix3},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Matrix3},transmissionSamplerSize:{value:new Vector2},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Matrix3},attenuationDistance:{value:0},attenuationColor:{value:new Color(0)},specularColor:{value:new Color(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Matrix3},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Matrix3},anisotropyVector:{value:new Vector2},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Matrix3}}]),vertexShader:ShaderChunk.meshphysical_vert,fragmentShader:ShaderChunk.meshphysical_frag};const _rgb={r:0,b:0,g:0};function WebGLBackground(n,e,t,r,s,a,o){const l=new Color(0);let c=a===!0?0:1,u,h,f=null,p=0,_=null;function x(d,m){let b=!1,E=m.isScene===!0?m.background:null;E&&E.isTexture&&(E=(m.backgroundBlurriness>0?t:e).get(E)),E===null?g(l,c):E&&E.isColor&&(g(E,1),b=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?r.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,o),(n.autoClear||b)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),E&&(E.isCubeTexture||E.mapping===CubeUVReflectionMapping)?(h===void 0&&(h=new Mesh(new BoxGeometry(1,1,1),new ShaderMaterial({name:"BackgroundCubeMaterial",uniforms:cloneUniforms(ShaderLib.backgroundCube.uniforms),vertexShader:ShaderLib.backgroundCube.vertexShader,fragmentShader:ShaderLib.backgroundCube.fragmentShader,side:BackSide,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,C,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=ColorManagement.getTransfer(E.colorSpace)!==SRGBTransfer,(f!==E||p!==E.version||_!==n.toneMapping)&&(h.material.needsUpdate=!0,f=E,p=E.version,_=n.toneMapping),h.layers.enableAll(),d.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(u===void 0&&(u=new Mesh(new PlaneGeometry(2,2),new ShaderMaterial({name:"BackgroundMaterial",uniforms:cloneUniforms(ShaderLib.background.uniforms),vertexShader:ShaderLib.background.vertexShader,fragmentShader:ShaderLib.background.fragmentShader,side:FrontSide,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(u)),u.material.uniforms.t2D.value=E,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.toneMapped=ColorManagement.getTransfer(E.colorSpace)!==SRGBTransfer,E.matrixAutoUpdate===!0&&E.updateMatrix(),u.material.uniforms.uvTransform.value.copy(E.matrix),(f!==E||p!==E.version||_!==n.toneMapping)&&(u.material.needsUpdate=!0,f=E,p=E.version,_=n.toneMapping),u.layers.enableAll(),d.unshift(u,u.geometry,u.material,0,0,null))}function g(d,m){d.getRGB(_rgb,getUnlitUniformColorSpace(n)),r.buffers.color.setClear(_rgb.r,_rgb.g,_rgb.b,m,o)}return{getClearColor:function(){return l},setClearColor:function(d,m=1){l.set(d),c=m,g(l,c)},getClearAlpha:function(){return c},setClearAlpha:function(d){c=d,g(l,c)},render:x}}function WebGLBindingStates(n,e,t,r){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),a=r.isWebGL2?null:e.get("OES_vertex_array_object"),o=r.isWebGL2||a!==null,l={},c=d(null);let u=c,h=!1;function f(L,B,G,$,z){let W=!1;if(o){const X=g($,G,B);u!==X&&(u=X,_(u.object)),W=m(L,$,G,z),W&&b(L,$,G,z)}else{const X=B.wireframe===!0;(u.geometry!==$.id||u.program!==G.id||u.wireframe!==X)&&(u.geometry=$.id,u.program=G.id,u.wireframe=X,W=!0)}z!==null&&t.update(z,n.ELEMENT_ARRAY_BUFFER),(W||h)&&(h=!1,Y(L,B,G,$),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function p(){return r.isWebGL2?n.createVertexArray():a.createVertexArrayOES()}function _(L){return r.isWebGL2?n.bindVertexArray(L):a.bindVertexArrayOES(L)}function x(L){return r.isWebGL2?n.deleteVertexArray(L):a.deleteVertexArrayOES(L)}function g(L,B,G){const $=G.wireframe===!0;let z=l[L.id];z===void 0&&(z={},l[L.id]=z);let W=z[B.id];W===void 0&&(W={},z[B.id]=W);let X=W[$];return X===void 0&&(X=d(p()),W[$]=X),X}function d(L){const B=[],G=[],$=[];for(let z=0;z<s;z++)B[z]=0,G[z]=0,$[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:G,attributeDivisors:$,object:L,attributes:{},index:null}}function m(L,B,G,$){const z=u.attributes,W=B.attributes;let X=0;const J=G.getAttributes();for(const ee in J)if(J[ee].location>=0){const q=z[ee];let ae=W[ee];if(ae===void 0&&(ee==="instanceMatrix"&&L.instanceMatrix&&(ae=L.instanceMatrix),ee==="instanceColor"&&L.instanceColor&&(ae=L.instanceColor)),q===void 0||q.attribute!==ae||ae&&q.data!==ae.data)return!0;X++}return u.attributesNum!==X||u.index!==$}function b(L,B,G,$){const z={},W=B.attributes;let X=0;const J=G.getAttributes();for(const ee in J)if(J[ee].location>=0){let q=W[ee];q===void 0&&(ee==="instanceMatrix"&&L.instanceMatrix&&(q=L.instanceMatrix),ee==="instanceColor"&&L.instanceColor&&(q=L.instanceColor));const ae={};ae.attribute=q,q&&q.data&&(ae.data=q.data),z[ee]=ae,X++}u.attributes=z,u.attributesNum=X,u.index=$}function E(){const L=u.newAttributes;for(let B=0,G=L.length;B<G;B++)L[B]=0}function T(L){P(L,0)}function P(L,B){const G=u.newAttributes,$=u.enabledAttributes,z=u.attributeDivisors;G[L]=1,$[L]===0&&(n.enableVertexAttribArray(L),$[L]=1),z[L]!==B&&((r.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[r.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,B),z[L]=B)}function C(){const L=u.newAttributes,B=u.enabledAttributes;for(let G=0,$=B.length;G<$;G++)B[G]!==L[G]&&(n.disableVertexAttribArray(G),B[G]=0)}function w(L,B,G,$,z,W,X){X===!0?n.vertexAttribIPointer(L,B,G,z,W):n.vertexAttribPointer(L,B,G,$,z,W)}function Y(L,B,G,$){if(r.isWebGL2===!1&&(L.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;E();const z=$.attributes,W=G.getAttributes(),X=B.defaultAttributeValues;for(const J in W){const ee=W[J];if(ee.location>=0){let k=z[J];if(k===void 0&&(J==="instanceMatrix"&&L.instanceMatrix&&(k=L.instanceMatrix),J==="instanceColor"&&L.instanceColor&&(k=L.instanceColor)),k!==void 0){const q=k.normalized,ae=k.itemSize,pe=t.get(k);if(pe===void 0)continue;const de=pe.buffer,be=pe.type,Ce=pe.bytesPerElement,Se=r.isWebGL2===!0&&(be===n.INT||be===n.UNSIGNED_INT||k.gpuType===IntType);if(k.isInterleavedBufferAttribute){const Ne=k.data,U=Ne.stride,Ze=k.offset;if(Ne.isInstancedInterleavedBuffer){for(let _e=0;_e<ee.locationSize;_e++)P(ee.location+_e,Ne.meshPerAttribute);L.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Ne.meshPerAttribute*Ne.count)}else for(let _e=0;_e<ee.locationSize;_e++)T(ee.location+_e);n.bindBuffer(n.ARRAY_BUFFER,de);for(let _e=0;_e<ee.locationSize;_e++)w(ee.location+_e,ae/ee.locationSize,be,q,U*Ce,(Ze+ae/ee.locationSize*_e)*Ce,Se)}else{if(k.isInstancedBufferAttribute){for(let Ne=0;Ne<ee.locationSize;Ne++)P(ee.location+Ne,k.meshPerAttribute);L.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let Ne=0;Ne<ee.locationSize;Ne++)T(ee.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,de);for(let Ne=0;Ne<ee.locationSize;Ne++)w(ee.location+Ne,ae/ee.locationSize,be,q,ae*Ce,ae/ee.locationSize*Ne*Ce,Se)}}else if(X!==void 0){const q=X[J];if(q!==void 0)switch(q.length){case 2:n.vertexAttrib2fv(ee.location,q);break;case 3:n.vertexAttrib3fv(ee.location,q);break;case 4:n.vertexAttrib4fv(ee.location,q);break;default:n.vertexAttrib1fv(ee.location,q)}}}}C()}function y(){H();for(const L in l){const B=l[L];for(const G in B){const $=B[G];for(const z in $)x($[z].object),delete $[z];delete B[G]}delete l[L]}}function A(L){if(l[L.id]===void 0)return;const B=l[L.id];for(const G in B){const $=B[G];for(const z in $)x($[z].object),delete $[z];delete B[G]}delete l[L.id]}function V(L){for(const B in l){const G=l[B];if(G[L.id]===void 0)continue;const $=G[L.id];for(const z in $)x($[z].object),delete $[z];delete G[L.id]}}function H(){ne(),h=!0,u!==c&&(u=c,_(u.object))}function ne(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:H,resetDefaultState:ne,dispose:y,releaseStatesOfGeometry:A,releaseStatesOfProgram:V,initAttributes:E,enableAttribute:T,disableUnusedAttributes:C}}function WebGLBufferRenderer(n,e,t,r){const s=r.isWebGL2;let a;function o(h){a=h}function l(h,f){n.drawArrays(a,h,f),t.update(f,a,1)}function c(h,f,p){if(p===0)return;let _,x;if(s)_=n,x="drawArraysInstanced";else if(_=e.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",_===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[x](a,h,f,p),t.update(f,a,p)}function u(h,f,p){if(p===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let x=0;x<p;x++)this.render(h[x],f[x]);else{_.multiDrawArraysWEBGL(a,h,0,f,0,p);let x=0;for(let g=0;g<p;g++)x+=f[g];t.update(x,a,1)}}this.setMode=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function WebGLCapabilities(n,e,t){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let l=t.precision!==void 0?t.precision:"highp";const c=a(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const u=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),d=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),m=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=p>0,T=o||e.has("OES_texture_float"),P=E&&T,C=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:u,getMaxAnisotropy:s,getMaxPrecision:a,precision:l,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:d,maxVaryings:m,maxFragmentUniforms:b,vertexTextures:E,floatFragmentTextures:T,floatVertexTextures:P,maxSamples:C}}function WebGLClipping(n){const e=this;let t=null,r=0,s=!1,a=!1;const o=new Plane,l=new Matrix3,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const _=f.length!==0||p||r!==0||s;return s=p,r=f.length,_},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,p){t=h(f,p,0)},this.setState=function(f,p,_){const x=f.clippingPlanes,g=f.clipIntersection,d=f.clipShadows,m=n.get(f);if(!s||x===null||x.length===0||a&&!d)a?h(null):u();else{const b=a?0:r,E=b*4;let T=m.clippingState||null;c.value=T,T=h(x,p,E,_);for(let P=0;P!==E;++P)T[P]=t[P];m.clippingState=T,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function u(){c.value!==t&&(c.value=t,c.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function h(f,p,_,x){const g=f!==null?f.length:0;let d=null;if(g!==0){if(d=c.value,x!==!0||d===null){const m=_+g*4,b=p.matrixWorldInverse;l.getNormalMatrix(b),(d===null||d.length<m)&&(d=new Float32Array(m));for(let E=0,T=_;E!==g;++E,T+=4)o.copy(f[E]).applyMatrix4(b,l),o.normal.toArray(d,T),d[T+3]=o.constant}c.value=d,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,d}}function WebGLCubeMaps(n){let e=new WeakMap;function t(o,l){return l===EquirectangularReflectionMapping?o.mapping=CubeReflectionMapping:l===EquirectangularRefractionMapping&&(o.mapping=CubeRefractionMapping),o}function r(o){if(o&&o.isTexture){const l=o.mapping;if(l===EquirectangularReflectionMapping||l===EquirectangularRefractionMapping)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const u=new WebGLCubeRenderTarget(c.height/2);return u.fromEquirectangularTexture(n,o),e.set(o,u),o.addEventListener("dispose",s),t(u.texture,o.mapping)}else return null}}return o}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap}return{get:r,dispose:a}}class OrthographicCamera extends Camera{constructor(e=-1,t=1,r=1,s=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=s,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,s,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=s,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=r-e,o=r+e,l=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=u*this.view.offsetX,o=a+u*this.view.width,l-=h*this.view.offsetY,c=l-h*this.view.height}this.projectionMatrix.makeOrthographic(a,o,l,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const LOD_MIN=4,EXTRA_LOD_SIGMA=[.125,.215,.35,.446,.526,.582],MAX_SAMPLES=20,_flatCamera=new OrthographicCamera,_clearColor=new Color;let _oldTarget=null,_oldActiveCubeFace=0,_oldActiveMipmapLevel=0;const PHI=(1+Math.sqrt(5))/2,INV_PHI=1/PHI,_axisDirections=[new Vector3(1,1,1),new Vector3(-1,1,1),new Vector3(1,1,-1),new Vector3(-1,1,-1),new Vector3(0,PHI,INV_PHI),new Vector3(0,PHI,-INV_PHI),new Vector3(INV_PHI,0,PHI),new Vector3(-INV_PHI,0,PHI),new Vector3(PHI,INV_PHI,0),new Vector3(-PHI,INV_PHI,0)];class PMREMGenerator{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,s=100){_oldTarget=this._renderer.getRenderTarget(),_oldActiveCubeFace=this._renderer.getActiveCubeFace(),_oldActiveMipmapLevel=this._renderer.getActiveMipmapLevel(),this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,r,s,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_getCubemapMaterial(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_getEquirectMaterial(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_oldTarget,_oldActiveCubeFace,_oldActiveMipmapLevel),e.scissorTest=!1,_setViewport(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===CubeReflectionMapping||e.mapping===CubeRefractionMapping?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_oldTarget=this._renderer.getRenderTarget(),_oldActiveCubeFace=this._renderer.getActiveCubeFace(),_oldActiveMipmapLevel=this._renderer.getActiveMipmapLevel();const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:LinearFilter,minFilter:LinearFilter,generateMipmaps:!1,type:HalfFloatType,format:RGBAFormat,colorSpace:LinearSRGBColorSpace,depthBuffer:!1},s=_createRenderTarget(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_createRenderTarget(e,t,r);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_createPlanes(a)),this._blurMaterial=_getBlurShader(a,e,t)}return s}_compileMaterial(e){const t=new Mesh(this._lodPlanes[0],e);this._renderer.compile(t,_flatCamera)}_sceneToCubeUV(e,t,r,s){const l=new PerspectiveCamera(90,1,t,r),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,p=h.toneMapping;h.getClearColor(_clearColor),h.toneMapping=NoToneMapping,h.autoClear=!1;const _=new MeshBasicMaterial({name:"PMREM.Background",side:BackSide,depthWrite:!1,depthTest:!1}),x=new Mesh(new BoxGeometry,_);let g=!1;const d=e.background;d?d.isColor&&(_.color.copy(d),e.background=null,g=!0):(_.color.copy(_clearColor),g=!0);for(let m=0;m<6;m++){const b=m%3;b===0?(l.up.set(0,c[m],0),l.lookAt(u[m],0,0)):b===1?(l.up.set(0,0,c[m]),l.lookAt(0,u[m],0)):(l.up.set(0,c[m],0),l.lookAt(0,0,u[m]));const E=this._cubeSize;_setViewport(s,b*E,m>2?E:0,E,E),h.setRenderTarget(s),g&&h.render(x,l),h.render(e,l)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=p,h.autoClear=f,e.background=d}_textureToCubeUV(e,t){const r=this._renderer,s=e.mapping===CubeReflectionMapping||e.mapping===CubeRefractionMapping;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_getCubemapMaterial()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_getEquirectMaterial());const a=s?this._cubemapMaterial:this._equirectMaterial,o=new Mesh(this._lodPlanes[0],a),l=a.uniforms;l.envMap.value=e;const c=this._cubeSize;_setViewport(t,0,0,3*c,2*c),r.setRenderTarget(t),r.render(o,_flatCamera)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=_axisDirections[(s-1)%_axisDirections.length];this._blur(e,s-1,s,a,o)}t.autoClear=r}_blur(e,t,r,s,a){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,r,s,"latitudinal",a),this._halfBlur(o,e,r,r,s,"longitudinal",a)}_halfBlur(e,t,r,s,a,o,l){const c=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Mesh(this._lodPlanes[s],u),p=u.uniforms,_=this._sizeLods[r]-1,x=isFinite(a)?Math.PI/(2*_):2*Math.PI/(2*MAX_SAMPLES-1),g=a/x,d=isFinite(a)?1+Math.floor(h*g):MAX_SAMPLES;d>MAX_SAMPLES&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${MAX_SAMPLES}`);const m=[];let b=0;for(let w=0;w<MAX_SAMPLES;++w){const Y=w/g,y=Math.exp(-Y*Y/2);m.push(y),w===0?b+=y:w<d&&(b+=2*y)}for(let w=0;w<m.length;w++)m[w]=m[w]/b;p.envMap.value=e.texture,p.samples.value=d,p.weights.value=m,p.latitudinal.value=o==="latitudinal",l&&(p.poleAxis.value=l);const{_lodMax:E}=this;p.dTheta.value=x,p.mipInt.value=E-r;const T=this._sizeLods[s],P=3*T*(s>E-LOD_MIN?s-E+LOD_MIN:0),C=4*(this._cubeSize-T);_setViewport(t,P,C,3*T,2*T),c.setRenderTarget(t),c.render(f,_flatCamera)}}function _createPlanes(n){const e=[],t=[],r=[];let s=n;const a=n-LOD_MIN+1+EXTRA_LOD_SIGMA.length;for(let o=0;o<a;o++){const l=Math.pow(2,s);t.push(l);let c=1/l;o>n-LOD_MIN?c=EXTRA_LOD_SIGMA[o-n+LOD_MIN-1]:o===0&&(c=0),r.push(c);const u=1/(l-2),h=-u,f=1+u,p=[h,h,f,h,f,f,h,h,f,f,h,f],_=6,x=6,g=3,d=2,m=1,b=new Float32Array(g*x*_),E=new Float32Array(d*x*_),T=new Float32Array(m*x*_);for(let C=0;C<_;C++){const w=C%3*2/3-1,Y=C>2?0:-1,y=[w,Y,0,w+2/3,Y,0,w+2/3,Y+1,0,w,Y,0,w+2/3,Y+1,0,w,Y+1,0];b.set(y,g*x*C),E.set(p,d*x*C);const A=[C,C,C,C,C,C];T.set(A,m*x*C)}const P=new BufferGeometry;P.setAttribute("position",new BufferAttribute(b,g)),P.setAttribute("uv",new BufferAttribute(E,d)),P.setAttribute("faceIndex",new BufferAttribute(T,m)),e.push(P),s>LOD_MIN&&s--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function _createRenderTarget(n,e,t){const r=new WebGLRenderTarget(n,e,t);return r.texture.mapping=CubeUVReflectionMapping,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function _setViewport(n,e,t,r,s){n.viewport.set(e,t,r,s),n.scissor.set(e,t,r,s)}function _getBlurShader(n,e,t){const r=new Float32Array(MAX_SAMPLES),s=new Vector3(0,1,0);return new ShaderMaterial({name:"SphericalGaussianBlur",defines:{n:MAX_SAMPLES,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_getCommonVertexShader(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:NoBlending,depthTest:!1,depthWrite:!1})}function _getEquirectMaterial(){return new ShaderMaterial({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_getCommonVertexShader(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:NoBlending,depthTest:!1,depthWrite:!1})}function _getCubemapMaterial(){return new ShaderMaterial({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_getCommonVertexShader(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:NoBlending,depthTest:!1,depthWrite:!1})}function _getCommonVertexShader(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function WebGLCubeUVMaps(n){let e=new WeakMap,t=null;function r(l){if(l&&l.isTexture){const c=l.mapping,u=c===EquirectangularReflectionMapping||c===EquirectangularRefractionMapping,h=c===CubeReflectionMapping||c===CubeRefractionMapping;if(u||h)if(l.isRenderTargetTexture&&l.needsPMREMUpdate===!0){l.needsPMREMUpdate=!1;let f=e.get(l);return t===null&&(t=new PMREMGenerator(n)),f=u?t.fromEquirectangular(l,f):t.fromCubemap(l,f),e.set(l,f),f.texture}else{if(e.has(l))return e.get(l).texture;{const f=l.image;if(u&&f&&f.height>0||h&&f&&s(f)){t===null&&(t=new PMREMGenerator(n));const p=u?t.fromEquirectangular(l):t.fromCubemap(l);return e.set(l,p),l.addEventListener("dispose",a),p.texture}else return null}}}return l}function s(l){let c=0;const u=6;for(let h=0;h<u;h++)l[h]!==void 0&&c++;return c===u}function a(l){const c=l.target;c.removeEventListener("dispose",a);const u=e.get(c);u!==void 0&&(e.delete(c),u.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:o}}function WebGLExtensions(n){const e={};function t(r){if(e[r]!==void 0)return e[r];let s;switch(r){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(r)}return e[r]=s,s}return{has:function(r){return t(r)!==null},init:function(r){r.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(r){const s=t(r);return s===null&&console.warn("THREE.WebGLRenderer: "+r+" extension not supported."),s}}}function WebGLGeometries(n,e,t,r){const s={},a=new WeakMap;function o(f){const p=f.target;p.index!==null&&e.remove(p.index);for(const x in p.attributes)e.remove(p.attributes[x]);for(const x in p.morphAttributes){const g=p.morphAttributes[x];for(let d=0,m=g.length;d<m;d++)e.remove(g[d])}p.removeEventListener("dispose",o),delete s[p.id];const _=a.get(p);_&&(e.remove(_),a.delete(p)),r.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function l(f,p){return s[p.id]===!0||(p.addEventListener("dispose",o),s[p.id]=!0,t.memory.geometries++),p}function c(f){const p=f.attributes;for(const x in p)e.update(p[x],n.ARRAY_BUFFER);const _=f.morphAttributes;for(const x in _){const g=_[x];for(let d=0,m=g.length;d<m;d++)e.update(g[d],n.ARRAY_BUFFER)}}function u(f){const p=[],_=f.index,x=f.attributes.position;let g=0;if(_!==null){const b=_.array;g=_.version;for(let E=0,T=b.length;E<T;E+=3){const P=b[E+0],C=b[E+1],w=b[E+2];p.push(P,C,C,w,w,P)}}else if(x!==void 0){const b=x.array;g=x.version;for(let E=0,T=b.length/3-1;E<T;E+=3){const P=E+0,C=E+1,w=E+2;p.push(P,C,C,w,w,P)}}else return;const d=new(arrayNeedsUint32(p)?Uint32BufferAttribute:Uint16BufferAttribute)(p,1);d.version=g;const m=a.get(f);m&&e.remove(m),a.set(f,d)}function h(f){const p=a.get(f);if(p){const _=f.index;_!==null&&p.version<_.version&&u(f)}else u(f);return a.get(f)}return{get:l,update:c,getWireframeAttribute:h}}function WebGLIndexedBufferRenderer(n,e,t,r){const s=r.isWebGL2;let a;function o(_){a=_}let l,c;function u(_){l=_.type,c=_.bytesPerElement}function h(_,x){n.drawElements(a,x,l,_*c),t.update(x,a,1)}function f(_,x,g){if(g===0)return;let d,m;if(s)d=n,m="drawElementsInstanced";else if(d=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",d===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[m](a,x,l,_*c,g),t.update(x,a,g)}function p(_,x,g){if(g===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<g;m++)this.render(_[m]/c,x[m]);else{d.multiDrawElementsWEBGL(a,x,0,l,_,0,g);let m=0;for(let b=0;b<g;b++)m+=x[b];t.update(m,a,1)}}this.setMode=o,this.setIndex=u,this.render=h,this.renderInstances=f,this.renderMultiDraw=p}function WebGLInfo(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(a,o,l){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=l*(a/3);break;case n.LINES:t.lines+=l*(a/2);break;case n.LINE_STRIP:t.lines+=l*(a-1);break;case n.LINE_LOOP:t.lines+=l*a;break;case n.POINTS:t.points+=l*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:r}}function numericalSort(n,e){return n[0]-e[0]}function absNumericalSort(n,e){return Math.abs(e[1])-Math.abs(n[1])}function WebGLMorphtargets(n,e,t){const r={},s=new Float32Array(8),a=new WeakMap,o=new Vector4,l=[];for(let u=0;u<8;u++)l[u]=[u,0];function c(u,h,f){const p=u.morphTargetInfluences;if(e.isWebGL2===!0){const x=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=x!==void 0?x.length:0;let d=a.get(h);if(d===void 0||d.count!==g){let B=function(){ne.dispose(),a.delete(h),h.removeEventListener("dispose",B)};var _=B;d!==void 0&&d.texture.dispose();const E=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,P=h.morphAttributes.color!==void 0,C=h.morphAttributes.position||[],w=h.morphAttributes.normal||[],Y=h.morphAttributes.color||[];let y=0;E===!0&&(y=1),T===!0&&(y=2),P===!0&&(y=3);let A=h.attributes.position.count*y,V=1;A>e.maxTextureSize&&(V=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const H=new Float32Array(A*V*4*g),ne=new DataArrayTexture(H,A,V,g);ne.type=FloatType,ne.needsUpdate=!0;const L=y*4;for(let G=0;G<g;G++){const $=C[G],z=w[G],W=Y[G],X=A*V*4*G;for(let J=0;J<$.count;J++){const ee=J*L;E===!0&&(o.fromBufferAttribute($,J),H[X+ee+0]=o.x,H[X+ee+1]=o.y,H[X+ee+2]=o.z,H[X+ee+3]=0),T===!0&&(o.fromBufferAttribute(z,J),H[X+ee+4]=o.x,H[X+ee+5]=o.y,H[X+ee+6]=o.z,H[X+ee+7]=0),P===!0&&(o.fromBufferAttribute(W,J),H[X+ee+8]=o.x,H[X+ee+9]=o.y,H[X+ee+10]=o.z,H[X+ee+11]=W.itemSize===4?o.w:1)}}d={count:g,texture:ne,size:new Vector2(A,V)},a.set(h,d),h.addEventListener("dispose",B)}let m=0;for(let E=0;E<p.length;E++)m+=p[E];const b=h.morphTargetsRelative?1:1-m;f.getUniforms().setValue(n,"morphTargetBaseInfluence",b),f.getUniforms().setValue(n,"morphTargetInfluences",p),f.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}else{const x=p===void 0?0:p.length;let g=r[h.id];if(g===void 0||g.length!==x){g=[];for(let T=0;T<x;T++)g[T]=[T,0];r[h.id]=g}for(let T=0;T<x;T++){const P=g[T];P[0]=T,P[1]=p[T]}g.sort(absNumericalSort);for(let T=0;T<8;T++)T<x&&g[T][1]?(l[T][0]=g[T][0],l[T][1]=g[T][1]):(l[T][0]=Number.MAX_SAFE_INTEGER,l[T][1]=0);l.sort(numericalSort);const d=h.morphAttributes.position,m=h.morphAttributes.normal;let b=0;for(let T=0;T<8;T++){const P=l[T],C=P[0],w=P[1];C!==Number.MAX_SAFE_INTEGER&&w?(d&&h.getAttribute("morphTarget"+T)!==d[C]&&h.setAttribute("morphTarget"+T,d[C]),m&&h.getAttribute("morphNormal"+T)!==m[C]&&h.setAttribute("morphNormal"+T,m[C]),s[T]=w,b+=w):(d&&h.hasAttribute("morphTarget"+T)===!0&&h.deleteAttribute("morphTarget"+T),m&&h.hasAttribute("morphNormal"+T)===!0&&h.deleteAttribute("morphNormal"+T),s[T]=0)}const E=h.morphTargetsRelative?1:1-b;f.getUniforms().setValue(n,"morphTargetBaseInfluence",E),f.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:c}}function WebGLObjects(n,e,t,r){let s=new WeakMap;function a(c){const u=r.render.frame,h=c.geometry,f=e.get(c,h);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return f}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}class DepthTexture extends Texture{constructor(e,t,r,s,a,o,l,c,u,h){if(h=h!==void 0?h:DepthFormat,h!==DepthFormat&&h!==DepthStencilFormat)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&h===DepthFormat&&(r=UnsignedIntType),r===void 0&&h===DepthStencilFormat&&(r=UnsignedInt248Type),super(null,s,a,o,l,c,h,r,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:NearestFilter,this.minFilter=c!==void 0?c:NearestFilter,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const emptyTexture=new Texture,emptyShadowTexture=new DepthTexture(1,1);emptyShadowTexture.compareFunction=LessEqualCompare;const emptyArrayTexture=new DataArrayTexture,empty3dTexture=new Data3DTexture,emptyCubeTexture=new CubeTexture,arrayCacheF32=[],arrayCacheI32=[],mat4array=new Float32Array(16),mat3array=new Float32Array(9),mat2array=new Float32Array(4);function flatten(n,e,t){const r=n[0];if(r<=0||r>0)return n;const s=e*t;let a=arrayCacheF32[s];if(a===void 0&&(a=new Float32Array(s),arrayCacheF32[s]=a),e!==0){r.toArray(a,0);for(let o=1,l=0;o!==e;++o)l+=t,n[o].toArray(a,l)}return a}function arraysEqual(n,e){if(n.length!==e.length)return!1;for(let t=0,r=n.length;t<r;t++)if(n[t]!==e[t])return!1;return!0}function copyArray(n,e){for(let t=0,r=e.length;t<r;t++)n[t]=e[t]}function allocTexUnits(n,e){let t=arrayCacheI32[e];t===void 0&&(t=new Int32Array(e),arrayCacheI32[e]=t);for(let r=0;r!==e;++r)t[r]=n.allocateTextureUnit();return t}function setValueV1f(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function setValueV2f(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(arraysEqual(t,e))return;n.uniform2fv(this.addr,e),copyArray(t,e)}}function setValueV3f(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(arraysEqual(t,e))return;n.uniform3fv(this.addr,e),copyArray(t,e)}}function setValueV4f(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(arraysEqual(t,e))return;n.uniform4fv(this.addr,e),copyArray(t,e)}}function setValueM2(n,e){const t=this.cache,r=e.elements;if(r===void 0){if(arraysEqual(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),copyArray(t,e)}else{if(arraysEqual(t,r))return;mat2array.set(r),n.uniformMatrix2fv(this.addr,!1,mat2array),copyArray(t,r)}}function setValueM3(n,e){const t=this.cache,r=e.elements;if(r===void 0){if(arraysEqual(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),copyArray(t,e)}else{if(arraysEqual(t,r))return;mat3array.set(r),n.uniformMatrix3fv(this.addr,!1,mat3array),copyArray(t,r)}}function setValueM4(n,e){const t=this.cache,r=e.elements;if(r===void 0){if(arraysEqual(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),copyArray(t,e)}else{if(arraysEqual(t,r))return;mat4array.set(r),n.uniformMatrix4fv(this.addr,!1,mat4array),copyArray(t,r)}}function setValueV1i(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function setValueV2i(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(arraysEqual(t,e))return;n.uniform2iv(this.addr,e),copyArray(t,e)}}function setValueV3i(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(arraysEqual(t,e))return;n.uniform3iv(this.addr,e),copyArray(t,e)}}function setValueV4i(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(arraysEqual(t,e))return;n.uniform4iv(this.addr,e),copyArray(t,e)}}function setValueV1ui(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function setValueV2ui(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(arraysEqual(t,e))return;n.uniform2uiv(this.addr,e),copyArray(t,e)}}function setValueV3ui(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(arraysEqual(t,e))return;n.uniform3uiv(this.addr,e),copyArray(t,e)}}function setValueV4ui(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(arraysEqual(t,e))return;n.uniform4uiv(this.addr,e),copyArray(t,e)}}function setValueT1(n,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(n.uniform1i(this.addr,s),r[0]=s);const a=this.type===n.SAMPLER_2D_SHADOW?emptyShadowTexture:emptyTexture;t.setTexture2D(e||a,s)}function setValueT3D1(n,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(n.uniform1i(this.addr,s),r[0]=s),t.setTexture3D(e||empty3dTexture,s)}function setValueT6(n,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(n.uniform1i(this.addr,s),r[0]=s),t.setTextureCube(e||emptyCubeTexture,s)}function setValueT2DArray1(n,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(n.uniform1i(this.addr,s),r[0]=s),t.setTexture2DArray(e||emptyArrayTexture,s)}function getSingularSetter(n){switch(n){case 5126:return setValueV1f;case 35664:return setValueV2f;case 35665:return setValueV3f;case 35666:return setValueV4f;case 35674:return setValueM2;case 35675:return setValueM3;case 35676:return setValueM4;case 5124:case 35670:return setValueV1i;case 35667:case 35671:return setValueV2i;case 35668:case 35672:return setValueV3i;case 35669:case 35673:return setValueV4i;case 5125:return setValueV1ui;case 36294:return setValueV2ui;case 36295:return setValueV3ui;case 36296:return setValueV4ui;case 35678:case 36198:case 36298:case 36306:case 35682:return setValueT1;case 35679:case 36299:case 36307:return setValueT3D1;case 35680:case 36300:case 36308:case 36293:return setValueT6;case 36289:case 36303:case 36311:case 36292:return setValueT2DArray1}}function setValueV1fArray(n,e){n.uniform1fv(this.addr,e)}function setValueV2fArray(n,e){const t=flatten(e,this.size,2);n.uniform2fv(this.addr,t)}function setValueV3fArray(n,e){const t=flatten(e,this.size,3);n.uniform3fv(this.addr,t)}function setValueV4fArray(n,e){const t=flatten(e,this.size,4);n.uniform4fv(this.addr,t)}function setValueM2Array(n,e){const t=flatten(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function setValueM3Array(n,e){const t=flatten(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function setValueM4Array(n,e){const t=flatten(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function setValueV1iArray(n,e){n.uniform1iv(this.addr,e)}function setValueV2iArray(n,e){n.uniform2iv(this.addr,e)}function setValueV3iArray(n,e){n.uniform3iv(this.addr,e)}function setValueV4iArray(n,e){n.uniform4iv(this.addr,e)}function setValueV1uiArray(n,e){n.uniform1uiv(this.addr,e)}function setValueV2uiArray(n,e){n.uniform2uiv(this.addr,e)}function setValueV3uiArray(n,e){n.uniform3uiv(this.addr,e)}function setValueV4uiArray(n,e){n.uniform4uiv(this.addr,e)}function setValueT1Array(n,e,t){const r=this.cache,s=e.length,a=allocTexUnits(t,s);arraysEqual(r,a)||(n.uniform1iv(this.addr,a),copyArray(r,a));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||emptyTexture,a[o])}function setValueT3DArray(n,e,t){const r=this.cache,s=e.length,a=allocTexUnits(t,s);arraysEqual(r,a)||(n.uniform1iv(this.addr,a),copyArray(r,a));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||empty3dTexture,a[o])}function setValueT6Array(n,e,t){const r=this.cache,s=e.length,a=allocTexUnits(t,s);arraysEqual(r,a)||(n.uniform1iv(this.addr,a),copyArray(r,a));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||emptyCubeTexture,a[o])}function setValueT2DArrayArray(n,e,t){const r=this.cache,s=e.length,a=allocTexUnits(t,s);arraysEqual(r,a)||(n.uniform1iv(this.addr,a),copyArray(r,a));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||emptyArrayTexture,a[o])}function getPureArraySetter(n){switch(n){case 5126:return setValueV1fArray;case 35664:return setValueV2fArray;case 35665:return setValueV3fArray;case 35666:return setValueV4fArray;case 35674:return setValueM2Array;case 35675:return setValueM3Array;case 35676:return setValueM4Array;case 5124:case 35670:return setValueV1iArray;case 35667:case 35671:return setValueV2iArray;case 35668:case 35672:return setValueV3iArray;case 35669:case 35673:return setValueV4iArray;case 5125:return setValueV1uiArray;case 36294:return setValueV2uiArray;case 36295:return setValueV3uiArray;case 36296:return setValueV4uiArray;case 35678:case 36198:case 36298:case 36306:case 35682:return setValueT1Array;case 35679:case 36299:case 36307:return setValueT3DArray;case 35680:case 36300:case 36308:case 36293:return setValueT6Array;case 36289:case 36303:case 36311:case 36292:return setValueT2DArrayArray}}class SingleUniform{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=getSingularSetter(t.type)}}class PureArrayUniform{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=getPureArraySetter(t.type)}}class StructuredUniform{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const s=this.seq;for(let a=0,o=s.length;a!==o;++a){const l=s[a];l.setValue(e,t[l.id],r)}}}const RePathPart=/(\w+)(\])?(\[|\.)?/g;function addUniform(n,e){n.seq.push(e),n.map[e.id]=e}function parseUniform(n,e,t){const r=n.name,s=r.length;for(RePathPart.lastIndex=0;;){const a=RePathPart.exec(r),o=RePathPart.lastIndex;let l=a[1];const c=a[2]==="]",u=a[3];if(c&&(l=l|0),u===void 0||u==="["&&o+2===s){addUniform(t,u===void 0?new SingleUniform(l,n,e):new PureArrayUniform(l,n,e));break}else{let f=t.map[l];f===void 0&&(f=new StructuredUniform(l),addUniform(t,f)),t=f}}}class WebGLUniforms{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<r;++s){const a=e.getActiveUniform(t,s),o=e.getUniformLocation(t,a.name);parseUniform(a,o,this)}}setValue(e,t,r,s){const a=this.map[t];a!==void 0&&a.setValue(e,r,s)}setOptional(e,t,r){const s=t[r];s!==void 0&&this.setValue(e,r,s)}static upload(e,t,r,s){for(let a=0,o=t.length;a!==o;++a){const l=t[a],c=r[l.id];c.needsUpdate!==!1&&l.setValue(e,c.value,s)}}static seqWithValue(e,t){const r=[];for(let s=0,a=e.length;s!==a;++s){const o=e[s];o.id in t&&r.push(o)}return r}}function WebGLShader(n,e,t){const r=n.createShader(e);return n.shaderSource(r,t),n.compileShader(r),r}const COMPLETION_STATUS_KHR=37297;let programIdCount=0;function handleSource(n,e){const t=n.split(`
`),r=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let o=s;o<a;o++){const l=o+1;r.push(`${l===e?">":" "} ${l}: ${t[o]}`)}return r.join(`
`)}function getEncodingComponents(n){const e=ColorManagement.getPrimaries(ColorManagement.workingColorSpace),t=ColorManagement.getPrimaries(n);let r;switch(e===t?r="":e===P3Primaries&&t===Rec709Primaries?r="LinearDisplayP3ToLinearSRGB":e===Rec709Primaries&&t===P3Primaries&&(r="LinearSRGBToLinearDisplayP3"),n){case LinearSRGBColorSpace:case LinearDisplayP3ColorSpace:return[r,"LinearTransferOETF"];case SRGBColorSpace:case DisplayP3ColorSpace:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[r,"LinearTransferOETF"]}}function getShaderErrors(n,e,t){const r=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(r&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+handleSource(n.getShaderSource(e),o)}else return s}function getTexelEncodingFunction(n,e){const t=getEncodingComponents(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function getToneMappingFunction(n,e){let t;switch(e){case LinearToneMapping:t="Linear";break;case ReinhardToneMapping:t="Reinhard";break;case CineonToneMapping:t="OptimizedCineon";break;case ACESFilmicToneMapping:t="ACESFilmic";break;case AgXToneMapping:t="AgX";break;case CustomToneMapping:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function generateExtensions(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(filterEmptyLine).join(`
`)}function generateVertexExtensions(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(filterEmptyLine).join(`
`)}function generateDefines(n){const e=[];for(const t in n){const r=n[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function fetchAttributeLocations(n,e){const t={},r=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<r;s++){const a=n.getActiveAttrib(e,s),o=a.name;let l=1;a.type===n.FLOAT_MAT2&&(l=2),a.type===n.FLOAT_MAT3&&(l=3),a.type===n.FLOAT_MAT4&&(l=4),t[o]={type:a.type,location:n.getAttribLocation(e,o),locationSize:l}}return t}function filterEmptyLine(n){return n!==""}function replaceLightNums(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function replaceClippingPlaneNums(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const includePattern=/^[ \t]*#include +<([\w\d./]+)>/gm;function resolveIncludes(n){return n.replace(includePattern,includeReplacer)}const shaderChunkMap=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function includeReplacer(n,e){let t=ShaderChunk[e];if(t===void 0){const r=shaderChunkMap.get(e);if(r!==void 0)t=ShaderChunk[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return resolveIncludes(t)}const unrollLoopPattern=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function unrollLoops(n){return n.replace(unrollLoopPattern,loopReplacer)}function loopReplacer(n,e,t,r){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=r.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function generatePrecision(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function generateShadowMapTypeDefine(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===PCFShadowMap?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===PCFSoftShadowMap?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===VSMShadowMap&&(e="SHADOWMAP_TYPE_VSM"),e}function generateEnvMapTypeDefine(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case CubeReflectionMapping:case CubeRefractionMapping:e="ENVMAP_TYPE_CUBE";break;case CubeUVReflectionMapping:e="ENVMAP_TYPE_CUBE_UV";break}return e}function generateEnvMapModeDefine(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case CubeRefractionMapping:e="ENVMAP_MODE_REFRACTION";break}return e}function generateEnvMapBlendingDefine(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case MultiplyOperation:e="ENVMAP_BLENDING_MULTIPLY";break;case MixOperation:e="ENVMAP_BLENDING_MIX";break;case AddOperation:e="ENVMAP_BLENDING_ADD";break}return e}function generateCubeUVSize(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:r,maxMip:t}}function WebGLProgram(n,e,t,r){const s=n.getContext(),a=t.defines;let o=t.vertexShader,l=t.fragmentShader;const c=generateShadowMapTypeDefine(t),u=generateEnvMapTypeDefine(t),h=generateEnvMapModeDefine(t),f=generateEnvMapBlendingDefine(t),p=generateCubeUVSize(t),_=t.isWebGL2?"":generateExtensions(t),x=generateVertexExtensions(t),g=generateDefines(a),d=s.createProgram();let m,b,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(filterEmptyLine).join(`
`),m.length>0&&(m+=`
`),b=[_,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(filterEmptyLine).join(`
`),b.length>0&&(b+=`
`)):(m=[generatePrecision(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(filterEmptyLine).join(`
`),b=[_,generatePrecision(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==NoToneMapping?"#define TONE_MAPPING":"",t.toneMapping!==NoToneMapping?ShaderChunk.tonemapping_pars_fragment:"",t.toneMapping!==NoToneMapping?getToneMappingFunction("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ShaderChunk.colorspace_pars_fragment,getTexelEncodingFunction("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(filterEmptyLine).join(`
`)),o=resolveIncludes(o),o=replaceLightNums(o,t),o=replaceClippingPlaneNums(o,t),l=resolveIncludes(l),l=replaceLightNums(l,t),l=replaceClippingPlaneNums(l,t),o=unrollLoops(o),l=unrollLoops(l),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[x,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===GLSL3?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===GLSL3?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const T=E+m+o,P=E+b+l,C=WebGLShader(s,s.VERTEX_SHADER,T),w=WebGLShader(s,s.FRAGMENT_SHADER,P);s.attachShader(d,C),s.attachShader(d,w),t.index0AttributeName!==void 0?s.bindAttribLocation(d,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(d,0,"position"),s.linkProgram(d);function Y(H){if(n.debug.checkShaderErrors){const ne=s.getProgramInfoLog(d).trim(),L=s.getShaderInfoLog(C).trim(),B=s.getShaderInfoLog(w).trim();let G=!0,$=!0;if(s.getProgramParameter(d,s.LINK_STATUS)===!1)if(G=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,d,C,w);else{const z=getShaderErrors(s,C,"vertex"),W=getShaderErrors(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(d,s.VALIDATE_STATUS)+`

Program Info Log: `+ne+`
`+z+`
`+W)}else ne!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ne):(L===""||B==="")&&($=!1);$&&(H.diagnostics={runnable:G,programLog:ne,vertexShader:{log:L,prefix:m},fragmentShader:{log:B,prefix:b}})}s.deleteShader(C),s.deleteShader(w),y=new WebGLUniforms(s,d),A=fetchAttributeLocations(s,d)}let y;this.getUniforms=function(){return y===void 0&&Y(this),y};let A;this.getAttributes=function(){return A===void 0&&Y(this),A};let V=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=s.getProgramParameter(d,COMPLETION_STATUS_KHR)),V},this.destroy=function(){r.releaseStatesOfProgram(this),s.deleteProgram(d),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=programIdCount++,this.cacheKey=e,this.usedTimes=1,this.program=d,this.vertexShader=C,this.fragmentShader=w,this}let _id$1=0;class WebGLShaderCache{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(r),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new WebGLShaderStage(e),t.set(e,r)),r}}class WebGLShaderStage{constructor(e){this.id=_id$1++,this.code=e,this.usedTimes=0}}function WebGLPrograms(n,e,t,r,s,a,o){const l=new Layers,c=new WebGLShaderCache,u=[],h=s.isWebGL2,f=s.logarithmicDepthBuffer,p=s.vertexTextures;let _=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return y===0?"uv":`uv${y}`}function d(y,A,V,H,ne){const L=H.fog,B=ne.geometry,G=y.isMeshStandardMaterial?H.environment:null,$=(y.isMeshStandardMaterial?t:e).get(y.envMap||G),z=$&&$.mapping===CubeUVReflectionMapping?$.image.height:null,W=x[y.type];y.precision!==null&&(_=s.getMaxPrecision(y.precision),_!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",_,"instead."));const X=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,J=X!==void 0?X.length:0;let ee=0;B.morphAttributes.position!==void 0&&(ee=1),B.morphAttributes.normal!==void 0&&(ee=2),B.morphAttributes.color!==void 0&&(ee=3);let k,q,ae,pe;if(W){const Qe=ShaderLib[W];k=Qe.vertexShader,q=Qe.fragmentShader}else k=y.vertexShader,q=y.fragmentShader,c.update(y),ae=c.getVertexShaderID(y),pe=c.getFragmentShaderID(y);const de=n.getRenderTarget(),be=ne.isInstancedMesh===!0,Ce=ne.isBatchedMesh===!0,Se=!!y.map,Ne=!!y.matcap,U=!!$,Ze=!!y.aoMap,_e=!!y.lightMap,Te=!!y.bumpMap,ue=!!y.normalMap,He=!!y.displacementMap,Le=!!y.emissiveMap,M=!!y.metalnessMap,v=!!y.roughnessMap,F=y.anisotropy>0,Z=y.clearcoat>0,K=y.iridescence>0,Q=y.sheen>0,he=y.transmission>0,se=F&&!!y.anisotropyMap,le=Z&&!!y.clearcoatMap,ve=Z&&!!y.clearcoatNormalMap,Pe=Z&&!!y.clearcoatRoughnessMap,j=K&&!!y.iridescenceMap,Be=K&&!!y.iridescenceThicknessMap,Fe=Q&&!!y.sheenColorMap,ye=Q&&!!y.sheenRoughnessMap,me=!!y.specularMap,ce=!!y.specularColorMap,Re=!!y.specularIntensityMap,Oe=he&&!!y.transmissionMap,$e=he&&!!y.thicknessMap,Ue=!!y.gradientMap,te=!!y.alphaMap,R=y.alphaTest>0,ie=!!y.alphaHash,re=!!y.extensions,Ee=!!B.attributes.uv1,ge=!!B.attributes.uv2,ke=!!B.attributes.uv3;let Ge=NoToneMapping;return y.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(Ge=n.toneMapping),{isWebGL2:h,shaderID:W,shaderType:y.type,shaderName:y.name,vertexShader:k,fragmentShader:q,defines:y.defines,customVertexShaderID:ae,customFragmentShaderID:pe,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:_,batching:Ce,instancing:be,instancingColor:be&&ne.instanceColor!==null,supportsVertexTextures:p,outputColorSpace:de===null?n.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:LinearSRGBColorSpace,map:Se,matcap:Ne,envMap:U,envMapMode:U&&$.mapping,envMapCubeUVHeight:z,aoMap:Ze,lightMap:_e,bumpMap:Te,normalMap:ue,displacementMap:p&&He,emissiveMap:Le,normalMapObjectSpace:ue&&y.normalMapType===ObjectSpaceNormalMap,normalMapTangentSpace:ue&&y.normalMapType===TangentSpaceNormalMap,metalnessMap:M,roughnessMap:v,anisotropy:F,anisotropyMap:se,clearcoat:Z,clearcoatMap:le,clearcoatNormalMap:ve,clearcoatRoughnessMap:Pe,iridescence:K,iridescenceMap:j,iridescenceThicknessMap:Be,sheen:Q,sheenColorMap:Fe,sheenRoughnessMap:ye,specularMap:me,specularColorMap:ce,specularIntensityMap:Re,transmission:he,transmissionMap:Oe,thicknessMap:$e,gradientMap:Ue,opaque:y.transparent===!1&&y.blending===NormalBlending,alphaMap:te,alphaTest:R,alphaHash:ie,combine:y.combine,mapUv:Se&&g(y.map.channel),aoMapUv:Ze&&g(y.aoMap.channel),lightMapUv:_e&&g(y.lightMap.channel),bumpMapUv:Te&&g(y.bumpMap.channel),normalMapUv:ue&&g(y.normalMap.channel),displacementMapUv:He&&g(y.displacementMap.channel),emissiveMapUv:Le&&g(y.emissiveMap.channel),metalnessMapUv:M&&g(y.metalnessMap.channel),roughnessMapUv:v&&g(y.roughnessMap.channel),anisotropyMapUv:se&&g(y.anisotropyMap.channel),clearcoatMapUv:le&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:ve&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:Be&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:ye&&g(y.sheenRoughnessMap.channel),specularMapUv:me&&g(y.specularMap.channel),specularColorMapUv:ce&&g(y.specularColorMap.channel),specularIntensityMapUv:Re&&g(y.specularIntensityMap.channel),transmissionMapUv:Oe&&g(y.transmissionMap.channel),thicknessMapUv:$e&&g(y.thicknessMap.channel),alphaMapUv:te&&g(y.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ue||F),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUv1s:Ee,vertexUv2s:ge,vertexUv3s:ke,pointsUvs:ne.isPoints===!0&&!!B.attributes.uv&&(Se||te),fog:!!L,useFog:y.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:ne.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:ee,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&V.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ge,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Se&&y.map.isVideoTexture===!0&&ColorManagement.getTransfer(y.map.colorSpace)===SRGBTransfer,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===DoubleSide,flipSided:y.side===BackSide,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:re&&y.extensions.derivatives===!0,extensionFragDepth:re&&y.extensions.fragDepth===!0,extensionDrawBuffers:re&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:re&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:re&&y.extensions.clipCullDistance&&r.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||r.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||r.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||r.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function m(y){const A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(const V in y.defines)A.push(V),A.push(y.defines[V]);return y.isRawShaderMaterial===!1&&(b(A,y),E(A,y),A.push(n.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function b(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function E(y,A){l.disableAll(),A.isWebGL2&&l.enable(0),A.supportsVertexTextures&&l.enable(1),A.instancing&&l.enable(2),A.instancingColor&&l.enable(3),A.matcap&&l.enable(4),A.envMap&&l.enable(5),A.normalMapObjectSpace&&l.enable(6),A.normalMapTangentSpace&&l.enable(7),A.clearcoat&&l.enable(8),A.iridescence&&l.enable(9),A.alphaTest&&l.enable(10),A.vertexColors&&l.enable(11),A.vertexAlphas&&l.enable(12),A.vertexUv1s&&l.enable(13),A.vertexUv2s&&l.enable(14),A.vertexUv3s&&l.enable(15),A.vertexTangents&&l.enable(16),A.anisotropy&&l.enable(17),A.alphaHash&&l.enable(18),A.batching&&l.enable(19),y.push(l.mask),l.disableAll(),A.fog&&l.enable(0),A.useFog&&l.enable(1),A.flatShading&&l.enable(2),A.logarithmicDepthBuffer&&l.enable(3),A.skinning&&l.enable(4),A.morphTargets&&l.enable(5),A.morphNormals&&l.enable(6),A.morphColors&&l.enable(7),A.premultipliedAlpha&&l.enable(8),A.shadowMapEnabled&&l.enable(9),A.useLegacyLights&&l.enable(10),A.doubleSided&&l.enable(11),A.flipSided&&l.enable(12),A.useDepthPacking&&l.enable(13),A.dithering&&l.enable(14),A.transmission&&l.enable(15),A.sheen&&l.enable(16),A.opaque&&l.enable(17),A.pointsUvs&&l.enable(18),A.decodeVideoTexture&&l.enable(19),y.push(l.mask)}function T(y){const A=x[y.type];let V;if(A){const H=ShaderLib[A];V=UniformsUtils.clone(H.uniforms)}else V=y.uniforms;return V}function P(y,A){let V;for(let H=0,ne=u.length;H<ne;H++){const L=u[H];if(L.cacheKey===A){V=L,++V.usedTimes;break}}return V===void 0&&(V=new WebGLProgram(n,A,y,a),u.push(V)),V}function C(y){if(--y.usedTimes===0){const A=u.indexOf(y);u[A]=u[u.length-1],u.pop(),y.destroy()}}function w(y){c.remove(y)}function Y(){c.dispose()}return{getParameters:d,getProgramCacheKey:m,getUniforms:T,acquireProgram:P,releaseProgram:C,releaseShaderCache:w,programs:u,dispose:Y}}function WebGLProperties(){let n=new WeakMap;function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function t(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{get:e,remove:t,update:r,dispose:s}}function painterSortStable(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function reversePainterSortStable(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function WebGLRenderList(){const n=[];let e=0;const t=[],r=[],s=[];function a(){e=0,t.length=0,r.length=0,s.length=0}function o(f,p,_,x,g,d){let m=n[e];return m===void 0?(m={id:f.id,object:f,geometry:p,material:_,groupOrder:x,renderOrder:f.renderOrder,z:g,group:d},n[e]=m):(m.id=f.id,m.object=f,m.geometry=p,m.material=_,m.groupOrder=x,m.renderOrder=f.renderOrder,m.z=g,m.group=d),e++,m}function l(f,p,_,x,g,d){const m=o(f,p,_,x,g,d);_.transmission>0?r.push(m):_.transparent===!0?s.push(m):t.push(m)}function c(f,p,_,x,g,d){const m=o(f,p,_,x,g,d);_.transmission>0?r.unshift(m):_.transparent===!0?s.unshift(m):t.unshift(m)}function u(f,p){t.length>1&&t.sort(f||painterSortStable),r.length>1&&r.sort(p||reversePainterSortStable),s.length>1&&s.sort(p||reversePainterSortStable)}function h(){for(let f=e,p=n.length;f<p;f++){const _=n[f];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:r,transparent:s,init:a,push:l,unshift:c,finish:h,sort:u}}function WebGLRenderLists(){let n=new WeakMap;function e(r,s){const a=n.get(r);let o;return a===void 0?(o=new WebGLRenderList,n.set(r,[o])):s>=a.length?(o=new WebGLRenderList,a.push(o)):o=a[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function UniformsCache(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Vector3,color:new Color};break;case"SpotLight":t={position:new Vector3,direction:new Vector3,color:new Color,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Vector3,color:new Color,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Vector3,skyColor:new Color,groundColor:new Color};break;case"RectAreaLight":t={color:new Color,position:new Vector3,halfWidth:new Vector3,halfHeight:new Vector3};break}return n[e.id]=t,t}}}function ShadowUniformsCache(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vector2};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vector2};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vector2,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let nextVersion=0;function shadowCastingAndTexturingLightsFirst(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function WebGLLights(n,e){const t=new UniformsCache,r=ShadowUniformsCache(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new Vector3);const a=new Vector3,o=new Matrix4,l=new Matrix4;function c(h,f){let p=0,_=0,x=0;for(let H=0;H<9;H++)s.probe[H].set(0,0,0);let g=0,d=0,m=0,b=0,E=0,T=0,P=0,C=0,w=0,Y=0,y=0;h.sort(shadowCastingAndTexturingLightsFirst);const A=f===!0?Math.PI:1;for(let H=0,ne=h.length;H<ne;H++){const L=h[H],B=L.color,G=L.intensity,$=L.distance,z=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)p+=B.r*G*A,_+=B.g*G*A,x+=B.b*G*A;else if(L.isLightProbe){for(let W=0;W<9;W++)s.probe[W].addScaledVector(L.sh.coefficients[W],G);y++}else if(L.isDirectionalLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity*A),L.castShadow){const X=L.shadow,J=r.get(L);J.shadowBias=X.bias,J.shadowNormalBias=X.normalBias,J.shadowRadius=X.radius,J.shadowMapSize=X.mapSize,s.directionalShadow[g]=J,s.directionalShadowMap[g]=z,s.directionalShadowMatrix[g]=L.shadow.matrix,T++}s.directional[g]=W,g++}else if(L.isSpotLight){const W=t.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(B).multiplyScalar(G*A),W.distance=$,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,s.spot[m]=W;const X=L.shadow;if(L.map&&(s.spotLightMap[w]=L.map,w++,X.updateMatrices(L),L.castShadow&&Y++),s.spotLightMatrix[m]=X.matrix,L.castShadow){const J=r.get(L);J.shadowBias=X.bias,J.shadowNormalBias=X.normalBias,J.shadowRadius=X.radius,J.shadowMapSize=X.mapSize,s.spotShadow[m]=J,s.spotShadowMap[m]=z,C++}m++}else if(L.isRectAreaLight){const W=t.get(L);W.color.copy(B).multiplyScalar(G),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),s.rectArea[b]=W,b++}else if(L.isPointLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity*A),W.distance=L.distance,W.decay=L.decay,L.castShadow){const X=L.shadow,J=r.get(L);J.shadowBias=X.bias,J.shadowNormalBias=X.normalBias,J.shadowRadius=X.radius,J.shadowMapSize=X.mapSize,J.shadowCameraNear=X.camera.near,J.shadowCameraFar=X.camera.far,s.pointShadow[d]=J,s.pointShadowMap[d]=z,s.pointShadowMatrix[d]=L.shadow.matrix,P++}s.point[d]=W,d++}else if(L.isHemisphereLight){const W=t.get(L);W.skyColor.copy(L.color).multiplyScalar(G*A),W.groundColor.copy(L.groundColor).multiplyScalar(G*A),s.hemi[E]=W,E++}}b>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=UniformsLib.LTC_FLOAT_1,s.rectAreaLTC2=UniformsLib.LTC_FLOAT_2):(s.rectAreaLTC1=UniformsLib.LTC_HALF_1,s.rectAreaLTC2=UniformsLib.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=UniformsLib.LTC_FLOAT_1,s.rectAreaLTC2=UniformsLib.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=UniformsLib.LTC_HALF_1,s.rectAreaLTC2=UniformsLib.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=p,s.ambient[1]=_,s.ambient[2]=x;const V=s.hash;(V.directionalLength!==g||V.pointLength!==d||V.spotLength!==m||V.rectAreaLength!==b||V.hemiLength!==E||V.numDirectionalShadows!==T||V.numPointShadows!==P||V.numSpotShadows!==C||V.numSpotMaps!==w||V.numLightProbes!==y)&&(s.directional.length=g,s.spot.length=m,s.rectArea.length=b,s.point.length=d,s.hemi.length=E,s.directionalShadow.length=T,s.directionalShadowMap.length=T,s.pointShadow.length=P,s.pointShadowMap.length=P,s.spotShadow.length=C,s.spotShadowMap.length=C,s.directionalShadowMatrix.length=T,s.pointShadowMatrix.length=P,s.spotLightMatrix.length=C+w-Y,s.spotLightMap.length=w,s.numSpotLightShadowsWithMaps=Y,s.numLightProbes=y,V.directionalLength=g,V.pointLength=d,V.spotLength=m,V.rectAreaLength=b,V.hemiLength=E,V.numDirectionalShadows=T,V.numPointShadows=P,V.numSpotShadows=C,V.numSpotMaps=w,V.numLightProbes=y,s.version=nextVersion++)}function u(h,f){let p=0,_=0,x=0,g=0,d=0;const m=f.matrixWorldInverse;for(let b=0,E=h.length;b<E;b++){const T=h[b];if(T.isDirectionalLight){const P=s.directional[p];P.direction.setFromMatrixPosition(T.matrixWorld),a.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(a),P.direction.transformDirection(m),p++}else if(T.isSpotLight){const P=s.spot[x];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(m),P.direction.setFromMatrixPosition(T.matrixWorld),a.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(a),P.direction.transformDirection(m),x++}else if(T.isRectAreaLight){const P=s.rectArea[g];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(m),l.identity(),o.copy(T.matrixWorld),o.premultiply(m),l.extractRotation(o),P.halfWidth.set(T.width*.5,0,0),P.halfHeight.set(0,T.height*.5,0),P.halfWidth.applyMatrix4(l),P.halfHeight.applyMatrix4(l),g++}else if(T.isPointLight){const P=s.point[_];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(m),_++}else if(T.isHemisphereLight){const P=s.hemi[d];P.direction.setFromMatrixPosition(T.matrixWorld),P.direction.transformDirection(m),d++}}}return{setup:c,setupView:u,state:s}}function WebGLRenderState(n,e){const t=new WebGLLights(n,e),r=[],s=[];function a(){r.length=0,s.length=0}function o(f){r.push(f)}function l(f){s.push(f)}function c(f){t.setup(r,f)}function u(f){t.setupView(r,f)}return{init:a,state:{lightsArray:r,shadowsArray:s,lights:t},setupLights:c,setupLightsView:u,pushLight:o,pushShadow:l}}function WebGLRenderStates(n,e){let t=new WeakMap;function r(a,o=0){const l=t.get(a);let c;return l===void 0?(c=new WebGLRenderState(n,e),t.set(a,[c])):o>=l.length?(c=new WebGLRenderState(n,e),l.push(c)):c=l[o],c}function s(){t=new WeakMap}return{get:r,dispose:s}}class MeshDepthMaterial extends Material{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=BasicDepthPacking,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class MeshDistanceMaterial extends Material{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vertex=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragment=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function WebGLShadowMap(n,e,t){let r=new Frustum;const s=new Vector2,a=new Vector2,o=new Vector4,l=new MeshDepthMaterial({depthPacking:RGBADepthPacking}),c=new MeshDistanceMaterial,u={},h=t.maxTextureSize,f={[FrontSide]:BackSide,[BackSide]:FrontSide,[DoubleSide]:DoubleSide},p=new ShaderMaterial({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vector2},radius:{value:4}},vertexShader:vertex,fragmentShader:fragment}),_=p.clone();_.defines.HORIZONTAL_PASS=1;const x=new BufferGeometry;x.setAttribute("position",new BufferAttribute(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Mesh(x,p),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=PCFShadowMap;let m=this.type;this.render=function(C,w,Y){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||C.length===0)return;const y=n.getRenderTarget(),A=n.getActiveCubeFace(),V=n.getActiveMipmapLevel(),H=n.state;H.setBlending(NoBlending),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const ne=m!==VSMShadowMap&&this.type===VSMShadowMap,L=m===VSMShadowMap&&this.type!==VSMShadowMap;for(let B=0,G=C.length;B<G;B++){const $=C[B],z=$.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const W=z.getFrameExtents();if(s.multiply(W),a.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/W.x),s.x=a.x*W.x,z.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/W.y),s.y=a.y*W.y,z.mapSize.y=a.y)),z.map===null||ne===!0||L===!0){const J=this.type!==VSMShadowMap?{minFilter:NearestFilter,magFilter:NearestFilter}:{};z.map!==null&&z.map.dispose(),z.map=new WebGLRenderTarget(s.x,s.y,J),z.map.texture.name=$.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();const X=z.getViewportCount();for(let J=0;J<X;J++){const ee=z.getViewport(J);o.set(a.x*ee.x,a.y*ee.y,a.x*ee.z,a.y*ee.w),H.viewport(o),z.updateMatrices($,J),r=z.getFrustum(),T(w,Y,z.camera,$,this.type)}z.isPointLightShadow!==!0&&this.type===VSMShadowMap&&b(z,Y),z.needsUpdate=!1}m=this.type,d.needsUpdate=!1,n.setRenderTarget(y,A,V)};function b(C,w){const Y=e.update(g);p.defines.VSM_SAMPLES!==C.blurSamples&&(p.defines.VSM_SAMPLES=C.blurSamples,_.defines.VSM_SAMPLES=C.blurSamples,p.needsUpdate=!0,_.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new WebGLRenderTarget(s.x,s.y)),p.uniforms.shadow_pass.value=C.map.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(w,null,Y,p,g,null),_.uniforms.shadow_pass.value=C.mapPass.texture,_.uniforms.resolution.value=C.mapSize,_.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(w,null,Y,_,g,null)}function E(C,w,Y,y){let A=null;const V=Y.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(V!==void 0)A=V;else if(A=Y.isPointLight===!0?c:l,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const H=A.uuid,ne=w.uuid;let L=u[H];L===void 0&&(L={},u[H]=L);let B=L[ne];B===void 0&&(B=A.clone(),L[ne]=B,w.addEventListener("dispose",P)),A=B}if(A.visible=w.visible,A.wireframe=w.wireframe,y===VSMShadowMap?A.side=w.shadowSide!==null?w.shadowSide:w.side:A.side=w.shadowSide!==null?w.shadowSide:f[w.side],A.alphaMap=w.alphaMap,A.alphaTest=w.alphaTest,A.map=w.map,A.clipShadows=w.clipShadows,A.clippingPlanes=w.clippingPlanes,A.clipIntersection=w.clipIntersection,A.displacementMap=w.displacementMap,A.displacementScale=w.displacementScale,A.displacementBias=w.displacementBias,A.wireframeLinewidth=w.wireframeLinewidth,A.linewidth=w.linewidth,Y.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const H=n.properties.get(A);H.light=Y}return A}function T(C,w,Y,y,A){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&A===VSMShadowMap)&&(!C.frustumCulled||r.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,C.matrixWorld);const ne=e.update(C),L=C.material;if(Array.isArray(L)){const B=ne.groups;for(let G=0,$=B.length;G<$;G++){const z=B[G],W=L[z.materialIndex];if(W&&W.visible){const X=E(C,W,y,A);C.onBeforeShadow(n,C,w,Y,ne,X,z),n.renderBufferDirect(Y,null,ne,X,C,z),C.onAfterShadow(n,C,w,Y,ne,X,z)}}}else if(L.visible){const B=E(C,L,y,A);C.onBeforeShadow(n,C,w,Y,ne,B,null),n.renderBufferDirect(Y,null,ne,B,C,null),C.onAfterShadow(n,C,w,Y,ne,B,null)}}const H=C.children;for(let ne=0,L=H.length;ne<L;ne++)T(H[ne],w,Y,y,A)}function P(C){C.target.removeEventListener("dispose",P);for(const Y in u){const y=u[Y],A=C.target.uuid;A in y&&(y[A].dispose(),delete y[A])}}}function WebGLState(n,e,t){const r=t.isWebGL2;function s(){let R=!1;const ie=new Vector4;let re=null;const Ee=new Vector4(0,0,0,0);return{setMask:function(ge){re!==ge&&!R&&(n.colorMask(ge,ge,ge,ge),re=ge)},setLocked:function(ge){R=ge},setClear:function(ge,ke,Ge,Ye,Qe){Qe===!0&&(ge*=Ye,ke*=Ye,Ge*=Ye),ie.set(ge,ke,Ge,Ye),Ee.equals(ie)===!1&&(n.clearColor(ge,ke,Ge,Ye),Ee.copy(ie))},reset:function(){R=!1,re=null,Ee.set(-1,0,0,0)}}}function a(){let R=!1,ie=null,re=null,Ee=null;return{setTest:function(ge){ge?Ce(n.DEPTH_TEST):Se(n.DEPTH_TEST)},setMask:function(ge){ie!==ge&&!R&&(n.depthMask(ge),ie=ge)},setFunc:function(ge){if(re!==ge){switch(ge){case NeverDepth:n.depthFunc(n.NEVER);break;case AlwaysDepth:n.depthFunc(n.ALWAYS);break;case LessDepth:n.depthFunc(n.LESS);break;case LessEqualDepth:n.depthFunc(n.LEQUAL);break;case EqualDepth:n.depthFunc(n.EQUAL);break;case GreaterEqualDepth:n.depthFunc(n.GEQUAL);break;case GreaterDepth:n.depthFunc(n.GREATER);break;case NotEqualDepth:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}re=ge}},setLocked:function(ge){R=ge},setClear:function(ge){Ee!==ge&&(n.clearDepth(ge),Ee=ge)},reset:function(){R=!1,ie=null,re=null,Ee=null}}}function o(){let R=!1,ie=null,re=null,Ee=null,ge=null,ke=null,Ge=null,Ye=null,Qe=null;return{setTest:function(Ve){R||(Ve?Ce(n.STENCIL_TEST):Se(n.STENCIL_TEST))},setMask:function(Ve){ie!==Ve&&!R&&(n.stencilMask(Ve),ie=Ve)},setFunc:function(Ve,Je,nt){(re!==Ve||Ee!==Je||ge!==nt)&&(n.stencilFunc(Ve,Je,nt),re=Ve,Ee=Je,ge=nt)},setOp:function(Ve,Je,nt){(ke!==Ve||Ge!==Je||Ye!==nt)&&(n.stencilOp(Ve,Je,nt),ke=Ve,Ge=Je,Ye=nt)},setLocked:function(Ve){R=Ve},setClear:function(Ve){Qe!==Ve&&(n.clearStencil(Ve),Qe=Ve)},reset:function(){R=!1,ie=null,re=null,Ee=null,ge=null,ke=null,Ge=null,Ye=null,Qe=null}}}const l=new s,c=new a,u=new o,h=new WeakMap,f=new WeakMap;let p={},_={},x=new WeakMap,g=[],d=null,m=!1,b=null,E=null,T=null,P=null,C=null,w=null,Y=null,y=new Color(0,0,0),A=0,V=!1,H=null,ne=null,L=null,B=null,G=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,W=0;const X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(X)[1]),z=W>=1):X.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),z=W>=2);let J=null,ee={};const k=n.getParameter(n.SCISSOR_BOX),q=n.getParameter(n.VIEWPORT),ae=new Vector4().fromArray(k),pe=new Vector4().fromArray(q);function de(R,ie,re,Ee){const ge=new Uint8Array(4),ke=n.createTexture();n.bindTexture(R,ke),n.texParameteri(R,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(R,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ge=0;Ge<re;Ge++)r&&(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)?n.texImage3D(ie,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,ge):n.texImage2D(ie+Ge,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ge);return ke}const be={};be[n.TEXTURE_2D]=de(n.TEXTURE_2D,n.TEXTURE_2D,1),be[n.TEXTURE_CUBE_MAP]=de(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),r&&(be[n.TEXTURE_2D_ARRAY]=de(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),be[n.TEXTURE_3D]=de(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),l.setClear(0,0,0,1),c.setClear(1),u.setClear(0),Ce(n.DEPTH_TEST),c.setFunc(LessEqualDepth),Le(!1),M(CullFaceBack),Ce(n.CULL_FACE),ue(NoBlending);function Ce(R){p[R]!==!0&&(n.enable(R),p[R]=!0)}function Se(R){p[R]!==!1&&(n.disable(R),p[R]=!1)}function Ne(R,ie){return _[R]!==ie?(n.bindFramebuffer(R,ie),_[R]=ie,r&&(R===n.DRAW_FRAMEBUFFER&&(_[n.FRAMEBUFFER]=ie),R===n.FRAMEBUFFER&&(_[n.DRAW_FRAMEBUFFER]=ie)),!0):!1}function U(R,ie){let re=g,Ee=!1;if(R)if(re=x.get(ie),re===void 0&&(re=[],x.set(ie,re)),R.isWebGLMultipleRenderTargets){const ge=R.texture;if(re.length!==ge.length||re[0]!==n.COLOR_ATTACHMENT0){for(let ke=0,Ge=ge.length;ke<Ge;ke++)re[ke]=n.COLOR_ATTACHMENT0+ke;re.length=ge.length,Ee=!0}}else re[0]!==n.COLOR_ATTACHMENT0&&(re[0]=n.COLOR_ATTACHMENT0,Ee=!0);else re[0]!==n.BACK&&(re[0]=n.BACK,Ee=!0);Ee&&(t.isWebGL2?n.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function Ze(R){return d!==R?(n.useProgram(R),d=R,!0):!1}const _e={[AddEquation]:n.FUNC_ADD,[SubtractEquation]:n.FUNC_SUBTRACT,[ReverseSubtractEquation]:n.FUNC_REVERSE_SUBTRACT};if(r)_e[MinEquation]=n.MIN,_e[MaxEquation]=n.MAX;else{const R=e.get("EXT_blend_minmax");R!==null&&(_e[MinEquation]=R.MIN_EXT,_e[MaxEquation]=R.MAX_EXT)}const Te={[ZeroFactor]:n.ZERO,[OneFactor]:n.ONE,[SrcColorFactor]:n.SRC_COLOR,[SrcAlphaFactor]:n.SRC_ALPHA,[SrcAlphaSaturateFactor]:n.SRC_ALPHA_SATURATE,[DstColorFactor]:n.DST_COLOR,[DstAlphaFactor]:n.DST_ALPHA,[OneMinusSrcColorFactor]:n.ONE_MINUS_SRC_COLOR,[OneMinusSrcAlphaFactor]:n.ONE_MINUS_SRC_ALPHA,[OneMinusDstColorFactor]:n.ONE_MINUS_DST_COLOR,[OneMinusDstAlphaFactor]:n.ONE_MINUS_DST_ALPHA,[ConstantColorFactor]:n.CONSTANT_COLOR,[OneMinusConstantColorFactor]:n.ONE_MINUS_CONSTANT_COLOR,[ConstantAlphaFactor]:n.CONSTANT_ALPHA,[OneMinusConstantAlphaFactor]:n.ONE_MINUS_CONSTANT_ALPHA};function ue(R,ie,re,Ee,ge,ke,Ge,Ye,Qe,Ve){if(R===NoBlending){m===!0&&(Se(n.BLEND),m=!1);return}if(m===!1&&(Ce(n.BLEND),m=!0),R!==CustomBlending){if(R!==b||Ve!==V){if((E!==AddEquation||C!==AddEquation)&&(n.blendEquation(n.FUNC_ADD),E=AddEquation,C=AddEquation),Ve)switch(R){case NormalBlending:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case AdditiveBlending:n.blendFunc(n.ONE,n.ONE);break;case SubtractiveBlending:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case MultiplyBlending:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case NormalBlending:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case AdditiveBlending:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case SubtractiveBlending:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case MultiplyBlending:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}T=null,P=null,w=null,Y=null,y.set(0,0,0),A=0,b=R,V=Ve}return}ge=ge||ie,ke=ke||re,Ge=Ge||Ee,(ie!==E||ge!==C)&&(n.blendEquationSeparate(_e[ie],_e[ge]),E=ie,C=ge),(re!==T||Ee!==P||ke!==w||Ge!==Y)&&(n.blendFuncSeparate(Te[re],Te[Ee],Te[ke],Te[Ge]),T=re,P=Ee,w=ke,Y=Ge),(Ye.equals(y)===!1||Qe!==A)&&(n.blendColor(Ye.r,Ye.g,Ye.b,Qe),y.copy(Ye),A=Qe),b=R,V=!1}function He(R,ie){R.side===DoubleSide?Se(n.CULL_FACE):Ce(n.CULL_FACE);let re=R.side===BackSide;ie&&(re=!re),Le(re),R.blending===NormalBlending&&R.transparent===!1?ue(NoBlending):ue(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),c.setFunc(R.depthFunc),c.setTest(R.depthTest),c.setMask(R.depthWrite),l.setMask(R.colorWrite);const Ee=R.stencilWrite;u.setTest(Ee),Ee&&(u.setMask(R.stencilWriteMask),u.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),u.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),F(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Ce(n.SAMPLE_ALPHA_TO_COVERAGE):Se(n.SAMPLE_ALPHA_TO_COVERAGE)}function Le(R){H!==R&&(R?n.frontFace(n.CW):n.frontFace(n.CCW),H=R)}function M(R){R!==CullFaceNone?(Ce(n.CULL_FACE),R!==ne&&(R===CullFaceBack?n.cullFace(n.BACK):R===CullFaceFront?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Se(n.CULL_FACE),ne=R}function v(R){R!==L&&(z&&n.lineWidth(R),L=R)}function F(R,ie,re){R?(Ce(n.POLYGON_OFFSET_FILL),(B!==ie||G!==re)&&(n.polygonOffset(ie,re),B=ie,G=re)):Se(n.POLYGON_OFFSET_FILL)}function Z(R){R?Ce(n.SCISSOR_TEST):Se(n.SCISSOR_TEST)}function K(R){R===void 0&&(R=n.TEXTURE0+$-1),J!==R&&(n.activeTexture(R),J=R)}function Q(R,ie,re){re===void 0&&(J===null?re=n.TEXTURE0+$-1:re=J);let Ee=ee[re];Ee===void 0&&(Ee={type:void 0,texture:void 0},ee[re]=Ee),(Ee.type!==R||Ee.texture!==ie)&&(J!==re&&(n.activeTexture(re),J=re),n.bindTexture(R,ie||be[R]),Ee.type=R,Ee.texture=ie)}function he(){const R=ee[J];R!==void 0&&R.type!==void 0&&(n.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function se(){try{n.compressedTexImage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function le(){try{n.compressedTexImage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ve(){try{n.texSubImage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Pe(){try{n.texSubImage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function j(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Be(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Fe(){try{n.texStorage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ye(){try{n.texStorage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function me(){try{n.texImage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ce(){try{n.texImage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Re(R){ae.equals(R)===!1&&(n.scissor(R.x,R.y,R.z,R.w),ae.copy(R))}function Oe(R){pe.equals(R)===!1&&(n.viewport(R.x,R.y,R.z,R.w),pe.copy(R))}function $e(R,ie){let re=f.get(ie);re===void 0&&(re=new WeakMap,f.set(ie,re));let Ee=re.get(R);Ee===void 0&&(Ee=n.getUniformBlockIndex(ie,R.name),re.set(R,Ee))}function Ue(R,ie){const Ee=f.get(ie).get(R);h.get(ie)!==Ee&&(n.uniformBlockBinding(ie,Ee,R.__bindingPointIndex),h.set(ie,Ee))}function te(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),r===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),p={},J=null,ee={},_={},x=new WeakMap,g=[],d=null,m=!1,b=null,E=null,T=null,P=null,C=null,w=null,Y=null,y=new Color(0,0,0),A=0,V=!1,H=null,ne=null,L=null,B=null,G=null,ae.set(0,0,n.canvas.width,n.canvas.height),pe.set(0,0,n.canvas.width,n.canvas.height),l.reset(),c.reset(),u.reset()}return{buffers:{color:l,depth:c,stencil:u},enable:Ce,disable:Se,bindFramebuffer:Ne,drawBuffers:U,useProgram:Ze,setBlending:ue,setMaterial:He,setFlipSided:Le,setCullFace:M,setLineWidth:v,setPolygonOffset:F,setScissorTest:Z,activeTexture:K,bindTexture:Q,unbindTexture:he,compressedTexImage2D:se,compressedTexImage3D:le,texImage2D:me,texImage3D:ce,updateUBOMapping:$e,uniformBlockBinding:Ue,texStorage2D:Fe,texStorage3D:ye,texSubImage2D:ve,texSubImage3D:Pe,compressedTexSubImage2D:j,compressedTexSubImage3D:Be,scissor:Re,viewport:Oe,reset:te}}function WebGLTextures(n,e,t,r,s,a,o){const l=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let f;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(M,v){return _?new OffscreenCanvas(M,v):createElementNS("canvas")}function g(M,v,F,Z){let K=1;if((M.width>Z||M.height>Z)&&(K=Z/Math.max(M.width,M.height)),K<1||v===!0)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap){const Q=v?floorPowerOfTwo:Math.floor,he=Q(K*M.width),se=Q(K*M.height);f===void 0&&(f=x(he,se));const le=F?x(he,se):f;return le.width=he,le.height=se,le.getContext("2d").drawImage(M,0,0,he,se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+he+"x"+se+")."),le}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),M;return M}function d(M){return isPowerOfTwo(M.width)&&isPowerOfTwo(M.height)}function m(M){return l?!1:M.wrapS!==ClampToEdgeWrapping||M.wrapT!==ClampToEdgeWrapping||M.minFilter!==NearestFilter&&M.minFilter!==LinearFilter}function b(M,v){return M.generateMipmaps&&v&&M.minFilter!==NearestFilter&&M.minFilter!==LinearFilter}function E(M){n.generateMipmap(M)}function T(M,v,F,Z,K=!1){if(l===!1)return v;if(M!==null){if(n[M]!==void 0)return n[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let Q=v;if(v===n.RED&&(F===n.FLOAT&&(Q=n.R32F),F===n.HALF_FLOAT&&(Q=n.R16F),F===n.UNSIGNED_BYTE&&(Q=n.R8)),v===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.R8UI),F===n.UNSIGNED_SHORT&&(Q=n.R16UI),F===n.UNSIGNED_INT&&(Q=n.R32UI),F===n.BYTE&&(Q=n.R8I),F===n.SHORT&&(Q=n.R16I),F===n.INT&&(Q=n.R32I)),v===n.RG&&(F===n.FLOAT&&(Q=n.RG32F),F===n.HALF_FLOAT&&(Q=n.RG16F),F===n.UNSIGNED_BYTE&&(Q=n.RG8)),v===n.RGBA){const he=K?LinearTransfer:ColorManagement.getTransfer(Z);F===n.FLOAT&&(Q=n.RGBA32F),F===n.HALF_FLOAT&&(Q=n.RGBA16F),F===n.UNSIGNED_BYTE&&(Q=he===SRGBTransfer?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function P(M,v,F){return b(M,F)===!0||M.isFramebufferTexture&&M.minFilter!==NearestFilter&&M.minFilter!==LinearFilter?Math.log2(Math.max(v.width,v.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?v.mipmaps.length:1}function C(M){return M===NearestFilter||M===NearestMipmapNearestFilter||M===NearestMipmapLinearFilter?n.NEAREST:n.LINEAR}function w(M){const v=M.target;v.removeEventListener("dispose",w),y(v),v.isVideoTexture&&h.delete(v)}function Y(M){const v=M.target;v.removeEventListener("dispose",Y),V(v)}function y(M){const v=r.get(M);if(v.__webglInit===void 0)return;const F=M.source,Z=p.get(F);if(Z){const K=Z[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&A(M),Object.keys(Z).length===0&&p.delete(F)}r.remove(M)}function A(M){const v=r.get(M);n.deleteTexture(v.__webglTexture);const F=M.source,Z=p.get(F);delete Z[v.__cacheKey],o.memory.textures--}function V(M){const v=M.texture,F=r.get(M),Z=r.get(v);if(Z.__webglTexture!==void 0&&(n.deleteTexture(Z.__webglTexture),o.memory.textures--),M.depthTexture&&M.depthTexture.dispose(),M.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(F.__webglFramebuffer[K]))for(let Q=0;Q<F.__webglFramebuffer[K].length;Q++)n.deleteFramebuffer(F.__webglFramebuffer[K][Q]);else n.deleteFramebuffer(F.__webglFramebuffer[K]);F.__webglDepthbuffer&&n.deleteRenderbuffer(F.__webglDepthbuffer[K])}else{if(Array.isArray(F.__webglFramebuffer))for(let K=0;K<F.__webglFramebuffer.length;K++)n.deleteFramebuffer(F.__webglFramebuffer[K]);else n.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&n.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&n.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let K=0;K<F.__webglColorRenderbuffer.length;K++)F.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(F.__webglColorRenderbuffer[K]);F.__webglDepthRenderbuffer&&n.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(M.isWebGLMultipleRenderTargets)for(let K=0,Q=v.length;K<Q;K++){const he=r.get(v[K]);he.__webglTexture&&(n.deleteTexture(he.__webglTexture),o.memory.textures--),r.remove(v[K])}r.remove(v),r.remove(M)}let H=0;function ne(){H=0}function L(){const M=H;return M>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+s.maxTextures),H+=1,M}function B(M){const v=[];return v.push(M.wrapS),v.push(M.wrapT),v.push(M.wrapR||0),v.push(M.magFilter),v.push(M.minFilter),v.push(M.anisotropy),v.push(M.internalFormat),v.push(M.format),v.push(M.type),v.push(M.generateMipmaps),v.push(M.premultiplyAlpha),v.push(M.flipY),v.push(M.unpackAlignment),v.push(M.colorSpace),v.join()}function G(M,v){const F=r.get(M);if(M.isVideoTexture&&He(M),M.isRenderTargetTexture===!1&&M.version>0&&F.__version!==M.version){const Z=M.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ae(F,M,v);return}}t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+v)}function $(M,v){const F=r.get(M);if(M.version>0&&F.__version!==M.version){ae(F,M,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+v)}function z(M,v){const F=r.get(M);if(M.version>0&&F.__version!==M.version){ae(F,M,v);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+v)}function W(M,v){const F=r.get(M);if(M.version>0&&F.__version!==M.version){pe(F,M,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+v)}const X={[RepeatWrapping]:n.REPEAT,[ClampToEdgeWrapping]:n.CLAMP_TO_EDGE,[MirroredRepeatWrapping]:n.MIRRORED_REPEAT},J={[NearestFilter]:n.NEAREST,[NearestMipmapNearestFilter]:n.NEAREST_MIPMAP_NEAREST,[NearestMipmapLinearFilter]:n.NEAREST_MIPMAP_LINEAR,[LinearFilter]:n.LINEAR,[LinearMipmapNearestFilter]:n.LINEAR_MIPMAP_NEAREST,[LinearMipmapLinearFilter]:n.LINEAR_MIPMAP_LINEAR},ee={[NeverCompare]:n.NEVER,[AlwaysCompare]:n.ALWAYS,[LessCompare]:n.LESS,[LessEqualCompare]:n.LEQUAL,[EqualCompare]:n.EQUAL,[GreaterEqualCompare]:n.GEQUAL,[GreaterCompare]:n.GREATER,[NotEqualCompare]:n.NOTEQUAL};function k(M,v,F){if(F?(n.texParameteri(M,n.TEXTURE_WRAP_S,X[v.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,X[v.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,X[v.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,J[v.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,J[v.minFilter])):(n.texParameteri(M,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(M,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(v.wrapS!==ClampToEdgeWrapping||v.wrapT!==ClampToEdgeWrapping)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(M,n.TEXTURE_MAG_FILTER,C(v.magFilter)),n.texParameteri(M,n.TEXTURE_MIN_FILTER,C(v.minFilter)),v.minFilter!==NearestFilter&&v.minFilter!==LinearFilter&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,ee[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Z=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===NearestFilter||v.minFilter!==NearestMipmapLinearFilter&&v.minFilter!==LinearMipmapLinearFilter||v.type===FloatType&&e.has("OES_texture_float_linear")===!1||l===!1&&v.type===HalfFloatType&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||r.get(v).__currentAnisotropy)&&(n.texParameterf(M,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),r.get(v).__currentAnisotropy=v.anisotropy)}}function q(M,v){let F=!1;M.__webglInit===void 0&&(M.__webglInit=!0,v.addEventListener("dispose",w));const Z=v.source;let K=p.get(Z);K===void 0&&(K={},p.set(Z,K));const Q=B(v);if(Q!==M.__cacheKey){K[Q]===void 0&&(K[Q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,F=!0),K[Q].usedTimes++;const he=K[M.__cacheKey];he!==void 0&&(K[M.__cacheKey].usedTimes--,he.usedTimes===0&&A(v)),M.__cacheKey=Q,M.__webglTexture=K[Q].texture}return F}function ae(M,v,F){let Z=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=n.TEXTURE_3D);const K=q(M,v),Q=v.source;t.bindTexture(Z,M.__webglTexture,n.TEXTURE0+F);const he=r.get(Q);if(Q.version!==he.__version||K===!0){t.activeTexture(n.TEXTURE0+F);const se=ColorManagement.getPrimaries(ColorManagement.workingColorSpace),le=v.colorSpace===NoColorSpace?null:ColorManagement.getPrimaries(v.colorSpace),ve=v.colorSpace===NoColorSpace||se===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Pe=m(v)&&d(v.image)===!1;let j=g(v.image,Pe,!1,s.maxTextureSize);j=Le(v,j);const Be=d(j)||l,Fe=a.convert(v.format,v.colorSpace);let ye=a.convert(v.type),me=T(v.internalFormat,Fe,ye,v.colorSpace,v.isVideoTexture);k(Z,v,Be);let ce;const Re=v.mipmaps,Oe=l&&v.isVideoTexture!==!0&&me!==RGB_ETC1_Format,$e=he.__version===void 0||K===!0,Ue=P(v,j,Be);if(v.isDepthTexture)me=n.DEPTH_COMPONENT,l?v.type===FloatType?me=n.DEPTH_COMPONENT32F:v.type===UnsignedIntType?me=n.DEPTH_COMPONENT24:v.type===UnsignedInt248Type?me=n.DEPTH24_STENCIL8:me=n.DEPTH_COMPONENT16:v.type===FloatType&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===DepthFormat&&me===n.DEPTH_COMPONENT&&v.type!==UnsignedShortType&&v.type!==UnsignedIntType&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=UnsignedIntType,ye=a.convert(v.type)),v.format===DepthStencilFormat&&me===n.DEPTH_COMPONENT&&(me=n.DEPTH_STENCIL,v.type!==UnsignedInt248Type&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=UnsignedInt248Type,ye=a.convert(v.type))),$e&&(Oe?t.texStorage2D(n.TEXTURE_2D,1,me,j.width,j.height):t.texImage2D(n.TEXTURE_2D,0,me,j.width,j.height,0,Fe,ye,null));else if(v.isDataTexture)if(Re.length>0&&Be){Oe&&$e&&t.texStorage2D(n.TEXTURE_2D,Ue,me,Re[0].width,Re[0].height);for(let te=0,R=Re.length;te<R;te++)ce=Re[te],Oe?t.texSubImage2D(n.TEXTURE_2D,te,0,0,ce.width,ce.height,Fe,ye,ce.data):t.texImage2D(n.TEXTURE_2D,te,me,ce.width,ce.height,0,Fe,ye,ce.data);v.generateMipmaps=!1}else Oe?($e&&t.texStorage2D(n.TEXTURE_2D,Ue,me,j.width,j.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,j.width,j.height,Fe,ye,j.data)):t.texImage2D(n.TEXTURE_2D,0,me,j.width,j.height,0,Fe,ye,j.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Oe&&$e&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ue,me,Re[0].width,Re[0].height,j.depth);for(let te=0,R=Re.length;te<R;te++)ce=Re[te],v.format!==RGBAFormat?Fe!==null?Oe?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,ce.width,ce.height,j.depth,Fe,ce.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,te,me,ce.width,ce.height,j.depth,0,ce.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?t.texSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,ce.width,ce.height,j.depth,Fe,ye,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,te,me,ce.width,ce.height,j.depth,0,Fe,ye,ce.data)}else{Oe&&$e&&t.texStorage2D(n.TEXTURE_2D,Ue,me,Re[0].width,Re[0].height);for(let te=0,R=Re.length;te<R;te++)ce=Re[te],v.format!==RGBAFormat?Fe!==null?Oe?t.compressedTexSubImage2D(n.TEXTURE_2D,te,0,0,ce.width,ce.height,Fe,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,te,me,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?t.texSubImage2D(n.TEXTURE_2D,te,0,0,ce.width,ce.height,Fe,ye,ce.data):t.texImage2D(n.TEXTURE_2D,te,me,ce.width,ce.height,0,Fe,ye,ce.data)}else if(v.isDataArrayTexture)Oe?($e&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ue,me,j.width,j.height,j.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,Fe,ye,j.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,me,j.width,j.height,j.depth,0,Fe,ye,j.data);else if(v.isData3DTexture)Oe?($e&&t.texStorage3D(n.TEXTURE_3D,Ue,me,j.width,j.height,j.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,Fe,ye,j.data)):t.texImage3D(n.TEXTURE_3D,0,me,j.width,j.height,j.depth,0,Fe,ye,j.data);else if(v.isFramebufferTexture){if($e)if(Oe)t.texStorage2D(n.TEXTURE_2D,Ue,me,j.width,j.height);else{let te=j.width,R=j.height;for(let ie=0;ie<Ue;ie++)t.texImage2D(n.TEXTURE_2D,ie,me,te,R,0,Fe,ye,null),te>>=1,R>>=1}}else if(Re.length>0&&Be){Oe&&$e&&t.texStorage2D(n.TEXTURE_2D,Ue,me,Re[0].width,Re[0].height);for(let te=0,R=Re.length;te<R;te++)ce=Re[te],Oe?t.texSubImage2D(n.TEXTURE_2D,te,0,0,Fe,ye,ce):t.texImage2D(n.TEXTURE_2D,te,me,Fe,ye,ce);v.generateMipmaps=!1}else Oe?($e&&t.texStorage2D(n.TEXTURE_2D,Ue,me,j.width,j.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Fe,ye,j)):t.texImage2D(n.TEXTURE_2D,0,me,Fe,ye,j);b(v,Be)&&E(Z),he.__version=Q.version,v.onUpdate&&v.onUpdate(v)}M.__version=v.version}function pe(M,v,F){if(v.image.length!==6)return;const Z=q(M,v),K=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+F);const Q=r.get(K);if(K.version!==Q.__version||Z===!0){t.activeTexture(n.TEXTURE0+F);const he=ColorManagement.getPrimaries(ColorManagement.workingColorSpace),se=v.colorSpace===NoColorSpace?null:ColorManagement.getPrimaries(v.colorSpace),le=v.colorSpace===NoColorSpace||he===se?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);const ve=v.isCompressedTexture||v.image[0].isCompressedTexture,Pe=v.image[0]&&v.image[0].isDataTexture,j=[];for(let te=0;te<6;te++)!ve&&!Pe?j[te]=g(v.image[te],!1,!0,s.maxCubemapSize):j[te]=Pe?v.image[te].image:v.image[te],j[te]=Le(v,j[te]);const Be=j[0],Fe=d(Be)||l,ye=a.convert(v.format,v.colorSpace),me=a.convert(v.type),ce=T(v.internalFormat,ye,me,v.colorSpace),Re=l&&v.isVideoTexture!==!0,Oe=Q.__version===void 0||Z===!0;let $e=P(v,Be,Fe);k(n.TEXTURE_CUBE_MAP,v,Fe);let Ue;if(ve){Re&&Oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,$e,ce,Be.width,Be.height);for(let te=0;te<6;te++){Ue=j[te].mipmaps;for(let R=0;R<Ue.length;R++){const ie=Ue[R];v.format!==RGBAFormat?ye!==null?Re?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,R,0,0,ie.width,ie.height,ye,ie.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,R,ce,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,R,0,0,ie.width,ie.height,ye,me,ie.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,R,ce,ie.width,ie.height,0,ye,me,ie.data)}}}else{Ue=v.mipmaps,Re&&Oe&&(Ue.length>0&&$e++,t.texStorage2D(n.TEXTURE_CUBE_MAP,$e,ce,j[0].width,j[0].height));for(let te=0;te<6;te++)if(Pe){Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,j[te].width,j[te].height,ye,me,j[te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ce,j[te].width,j[te].height,0,ye,me,j[te].data);for(let R=0;R<Ue.length;R++){const re=Ue[R].image[te].image;Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,R+1,0,0,re.width,re.height,ye,me,re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,R+1,ce,re.width,re.height,0,ye,me,re.data)}}else{Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ye,me,j[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ce,ye,me,j[te]);for(let R=0;R<Ue.length;R++){const ie=Ue[R];Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,R+1,0,0,ye,me,ie.image[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,R+1,ce,ye,me,ie.image[te])}}}b(v,Fe)&&E(n.TEXTURE_CUBE_MAP),Q.__version=K.version,v.onUpdate&&v.onUpdate(v)}M.__version=v.version}function de(M,v,F,Z,K,Q){const he=a.convert(F.format,F.colorSpace),se=a.convert(F.type),le=T(F.internalFormat,he,se,F.colorSpace);if(!r.get(v).__hasExternalTextures){const Pe=Math.max(1,v.width>>Q),j=Math.max(1,v.height>>Q);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,Q,le,Pe,j,v.depth,0,he,se,null):t.texImage2D(K,Q,le,Pe,j,0,he,se,null)}t.bindFramebuffer(n.FRAMEBUFFER,M),ue(v)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,K,r.get(F).__webglTexture,0,Te(v)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,K,r.get(F).__webglTexture,Q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function be(M,v,F){if(n.bindRenderbuffer(n.RENDERBUFFER,M),v.depthBuffer&&!v.stencilBuffer){let Z=l===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(F||ue(v)){const K=v.depthTexture;K&&K.isDepthTexture&&(K.type===FloatType?Z=n.DEPTH_COMPONENT32F:K.type===UnsignedIntType&&(Z=n.DEPTH_COMPONENT24));const Q=Te(v);ue(v)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Q,Z,v.width,v.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,Q,Z,v.width,v.height)}else n.renderbufferStorage(n.RENDERBUFFER,Z,v.width,v.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,M)}else if(v.depthBuffer&&v.stencilBuffer){const Z=Te(v);F&&ue(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Z,n.DEPTH24_STENCIL8,v.width,v.height):ue(v)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Z,n.DEPTH24_STENCIL8,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,M)}else{const Z=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let K=0;K<Z.length;K++){const Q=Z[K],he=a.convert(Q.format,Q.colorSpace),se=a.convert(Q.type),le=T(Q.internalFormat,he,se,Q.colorSpace),ve=Te(v);F&&ue(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,le,v.width,v.height):ue(v)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ve,le,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,le,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ce(M,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,M),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!r.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G(v.depthTexture,0);const Z=r.get(v.depthTexture).__webglTexture,K=Te(v);if(v.depthTexture.format===DepthFormat)ue(v)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0);else if(v.depthTexture.format===DepthStencilFormat)ue(v)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Se(M){const v=r.get(M),F=M.isWebGLCubeRenderTarget===!0;if(M.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ce(v.__webglFramebuffer,M)}else if(F){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]=n.createRenderbuffer(),be(v.__webglDepthbuffer[Z],M,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=n.createRenderbuffer(),be(v.__webglDepthbuffer,M,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ne(M,v,F){const Z=r.get(M);v!==void 0&&de(Z.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&Se(M)}function U(M){const v=M.texture,F=r.get(M),Z=r.get(v);M.addEventListener("dispose",Y),M.isWebGLMultipleRenderTargets!==!0&&(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=v.version,o.memory.textures++);const K=M.isWebGLCubeRenderTarget===!0,Q=M.isWebGLMultipleRenderTargets===!0,he=d(M)||l;if(K){F.__webglFramebuffer=[];for(let se=0;se<6;se++)if(l&&v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[se]=[];for(let le=0;le<v.mipmaps.length;le++)F.__webglFramebuffer[se][le]=n.createFramebuffer()}else F.__webglFramebuffer[se]=n.createFramebuffer()}else{if(l&&v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let se=0;se<v.mipmaps.length;se++)F.__webglFramebuffer[se]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(Q)if(s.drawBuffers){const se=M.texture;for(let le=0,ve=se.length;le<ve;le++){const Pe=r.get(se[le]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(l&&M.samples>0&&ue(M)===!1){const se=Q?v:[v];F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let le=0;le<se.length;le++){const ve=se[le];F.__webglColorRenderbuffer[le]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[le]);const Pe=a.convert(ve.format,ve.colorSpace),j=a.convert(ve.type),Be=T(ve.internalFormat,Pe,j,ve.colorSpace,M.isXRRenderTarget===!0),Fe=Te(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,Fe,Be,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,F.__webglColorRenderbuffer[le])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),be(F.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),k(n.TEXTURE_CUBE_MAP,v,he);for(let se=0;se<6;se++)if(l&&v.mipmaps&&v.mipmaps.length>0)for(let le=0;le<v.mipmaps.length;le++)de(F.__webglFramebuffer[se][le],M,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,le);else de(F.__webglFramebuffer[se],M,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);b(v,he)&&E(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const se=M.texture;for(let le=0,ve=se.length;le<ve;le++){const Pe=se[le],j=r.get(Pe);t.bindTexture(n.TEXTURE_2D,j.__webglTexture),k(n.TEXTURE_2D,Pe,he),de(F.__webglFramebuffer,M,Pe,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,0),b(Pe,he)&&E(n.TEXTURE_2D)}t.unbindTexture()}else{let se=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(l?se=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(se,Z.__webglTexture),k(se,v,he),l&&v.mipmaps&&v.mipmaps.length>0)for(let le=0;le<v.mipmaps.length;le++)de(F.__webglFramebuffer[le],M,v,n.COLOR_ATTACHMENT0,se,le);else de(F.__webglFramebuffer,M,v,n.COLOR_ATTACHMENT0,se,0);b(v,he)&&E(se),t.unbindTexture()}M.depthBuffer&&Se(M)}function Ze(M){const v=d(M)||l,F=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let Z=0,K=F.length;Z<K;Z++){const Q=F[Z];if(b(Q,v)){const he=M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,se=r.get(Q).__webglTexture;t.bindTexture(he,se),E(he),t.unbindTexture()}}}function _e(M){if(l&&M.samples>0&&ue(M)===!1){const v=M.isWebGLMultipleRenderTargets?M.texture:[M.texture],F=M.width,Z=M.height;let K=n.COLOR_BUFFER_BIT;const Q=[],he=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=r.get(M),le=M.isWebGLMultipleRenderTargets===!0;if(le)for(let ve=0;ve<v.length;ve++)t.bindFramebuffer(n.FRAMEBUFFER,se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,se.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,se.__webglFramebuffer);for(let ve=0;ve<v.length;ve++){Q.push(n.COLOR_ATTACHMENT0+ve),M.depthBuffer&&Q.push(he);const Pe=se.__ignoreDepthValues!==void 0?se.__ignoreDepthValues:!1;if(Pe===!1&&(M.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),le&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,se.__webglColorRenderbuffer[ve]),Pe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[he]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[he])),le){const j=r.get(v[ve]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,j,0)}n.blitFramebuffer(0,0,F,Z,0,0,F,Z,K,n.NEAREST),u&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),le)for(let ve=0;ve<v.length;ve++){t.bindFramebuffer(n.FRAMEBUFFER,se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,se.__webglColorRenderbuffer[ve]);const Pe=r.get(v[ve]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,Pe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,se.__webglMultisampledFramebuffer)}}function Te(M){return Math.min(s.maxSamples,M.samples)}function ue(M){const v=r.get(M);return l&&M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function He(M){const v=o.render.frame;h.get(M)!==v&&(h.set(M,v),M.update())}function Le(M,v){const F=M.colorSpace,Z=M.format,K=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||M.format===_SRGBAFormat||F!==LinearSRGBColorSpace&&F!==NoColorSpace&&(ColorManagement.getTransfer(F)===SRGBTransfer?l===!1?e.has("EXT_sRGB")===!0&&Z===RGBAFormat?(M.format=_SRGBAFormat,M.minFilter=LinearFilter,M.generateMipmaps=!1):v=ImageUtils.sRGBToLinear(v):(Z!==RGBAFormat||K!==UnsignedByteType)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}this.allocateTextureUnit=L,this.resetTextureUnits=ne,this.setTexture2D=G,this.setTexture2DArray=$,this.setTexture3D=z,this.setTextureCube=W,this.rebindTextures=Ne,this.setupRenderTarget=U,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=de,this.useMultisampledRTT=ue}function WebGLUtils(n,e,t){const r=t.isWebGL2;function s(a,o=NoColorSpace){let l;const c=ColorManagement.getTransfer(o);if(a===UnsignedByteType)return n.UNSIGNED_BYTE;if(a===UnsignedShort4444Type)return n.UNSIGNED_SHORT_4_4_4_4;if(a===UnsignedShort5551Type)return n.UNSIGNED_SHORT_5_5_5_1;if(a===ByteType)return n.BYTE;if(a===ShortType)return n.SHORT;if(a===UnsignedShortType)return n.UNSIGNED_SHORT;if(a===IntType)return n.INT;if(a===UnsignedIntType)return n.UNSIGNED_INT;if(a===FloatType)return n.FLOAT;if(a===HalfFloatType)return r?n.HALF_FLOAT:(l=e.get("OES_texture_half_float"),l!==null?l.HALF_FLOAT_OES:null);if(a===AlphaFormat)return n.ALPHA;if(a===RGBAFormat)return n.RGBA;if(a===LuminanceFormat)return n.LUMINANCE;if(a===LuminanceAlphaFormat)return n.LUMINANCE_ALPHA;if(a===DepthFormat)return n.DEPTH_COMPONENT;if(a===DepthStencilFormat)return n.DEPTH_STENCIL;if(a===_SRGBAFormat)return l=e.get("EXT_sRGB"),l!==null?l.SRGB_ALPHA_EXT:null;if(a===RedFormat)return n.RED;if(a===RedIntegerFormat)return n.RED_INTEGER;if(a===RGFormat)return n.RG;if(a===RGIntegerFormat)return n.RG_INTEGER;if(a===RGBAIntegerFormat)return n.RGBA_INTEGER;if(a===RGB_S3TC_DXT1_Format||a===RGBA_S3TC_DXT1_Format||a===RGBA_S3TC_DXT3_Format||a===RGBA_S3TC_DXT5_Format)if(c===SRGBTransfer)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(a===RGB_S3TC_DXT1_Format)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===RGBA_S3TC_DXT1_Format)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===RGBA_S3TC_DXT3_Format)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===RGBA_S3TC_DXT5_Format)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(a===RGB_S3TC_DXT1_Format)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===RGBA_S3TC_DXT1_Format)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===RGBA_S3TC_DXT3_Format)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===RGBA_S3TC_DXT5_Format)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===RGB_PVRTC_4BPPV1_Format||a===RGB_PVRTC_2BPPV1_Format||a===RGBA_PVRTC_4BPPV1_Format||a===RGBA_PVRTC_2BPPV1_Format)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(a===RGB_PVRTC_4BPPV1_Format)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===RGB_PVRTC_2BPPV1_Format)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===RGBA_PVRTC_4BPPV1_Format)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===RGBA_PVRTC_2BPPV1_Format)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===RGB_ETC1_Format)return l=e.get("WEBGL_compressed_texture_etc1"),l!==null?l.COMPRESSED_RGB_ETC1_WEBGL:null;if(a===RGB_ETC2_Format||a===RGBA_ETC2_EAC_Format)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(a===RGB_ETC2_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(a===RGBA_ETC2_EAC_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===RGBA_ASTC_4x4_Format||a===RGBA_ASTC_5x4_Format||a===RGBA_ASTC_5x5_Format||a===RGBA_ASTC_6x5_Format||a===RGBA_ASTC_6x6_Format||a===RGBA_ASTC_8x5_Format||a===RGBA_ASTC_8x6_Format||a===RGBA_ASTC_8x8_Format||a===RGBA_ASTC_10x5_Format||a===RGBA_ASTC_10x6_Format||a===RGBA_ASTC_10x8_Format||a===RGBA_ASTC_10x10_Format||a===RGBA_ASTC_12x10_Format||a===RGBA_ASTC_12x12_Format)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(a===RGBA_ASTC_4x4_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===RGBA_ASTC_5x4_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===RGBA_ASTC_5x5_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===RGBA_ASTC_6x5_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===RGBA_ASTC_6x6_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===RGBA_ASTC_8x5_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===RGBA_ASTC_8x6_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===RGBA_ASTC_8x8_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===RGBA_ASTC_10x5_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===RGBA_ASTC_10x6_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===RGBA_ASTC_10x8_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===RGBA_ASTC_10x10_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===RGBA_ASTC_12x10_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===RGBA_ASTC_12x12_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===RGBA_BPTC_Format||a===RGB_BPTC_SIGNED_Format||a===RGB_BPTC_UNSIGNED_Format)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(a===RGBA_BPTC_Format)return c===SRGBTransfer?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===RGB_BPTC_SIGNED_Format)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===RGB_BPTC_UNSIGNED_Format)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===RED_RGTC1_Format||a===SIGNED_RED_RGTC1_Format||a===RED_GREEN_RGTC2_Format||a===SIGNED_RED_GREEN_RGTC2_Format)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(a===RGBA_BPTC_Format)return l.COMPRESSED_RED_RGTC1_EXT;if(a===SIGNED_RED_RGTC1_Format)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===RED_GREEN_RGTC2_Format)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===SIGNED_RED_GREEN_RGTC2_Format)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===UnsignedInt248Type?r?n.UNSIGNED_INT_24_8:(l=e.get("WEBGL_depth_texture"),l!==null?l.UNSIGNED_INT_24_8_WEBGL:null):n[a]!==void 0?n[a]:null}return{convert:s}}class ArrayCamera extends PerspectiveCamera{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Group extends Object3D{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _moveEvent={type:"move"};class WebXRController{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Group,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Group,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Vector3,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Vector3),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Group,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Vector3,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Vector3),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let s=null,a=null,o=null;const l=this._targetRay,c=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const g of e.hand.values()){const d=t.getJointPose(g,r),m=this._getHandJoint(u,g);d!==null&&(m.matrix.fromArray(d.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=d.radius),m.visible=d!==null}const h=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],p=h.position.distanceTo(f.position),_=.02,x=.005;u.inputState.pinching&&p>_+x?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&p<=_-x&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,r),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));l!==null&&(s=t.getPose(e.targetRaySpace,r),s===null&&a!==null&&(s=a),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(_moveEvent)))}return l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new Group;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}class WebXRManager extends EventDispatcher{constructor(e,t){super();const r=this;let s=null,a=1,o=null,l="local-floor",c=1,u=null,h=null,f=null,p=null,_=null,x=null;const g=t.getContextAttributes();let d=null,m=null;const b=[],E=[],T=new Vector2;let P=null;const C=new PerspectiveCamera;C.layers.enable(1),C.viewport=new Vector4;const w=new PerspectiveCamera;w.layers.enable(2),w.viewport=new Vector4;const Y=[C,w],y=new ArrayCamera;y.layers.enable(1),y.layers.enable(2);let A=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let q=b[k];return q===void 0&&(q=new WebXRController,b[k]=q),q.getTargetRaySpace()},this.getControllerGrip=function(k){let q=b[k];return q===void 0&&(q=new WebXRController,b[k]=q),q.getGripSpace()},this.getHand=function(k){let q=b[k];return q===void 0&&(q=new WebXRController,b[k]=q),q.getHandSpace()};function H(k){const q=E.indexOf(k.inputSource);if(q===-1)return;const ae=b[q];ae!==void 0&&(ae.update(k.inputSource,k.frame,u||o),ae.dispatchEvent({type:k.type,data:k.inputSource}))}function ne(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",ne),s.removeEventListener("inputsourceschange",L);for(let k=0;k<b.length;k++){const q=E[k];q!==null&&(E[k]=null,b[k].disconnect(q))}A=null,V=null,e.setRenderTarget(d),_=null,p=null,f=null,s=null,m=null,ee.stop(),r.isPresenting=!1,e.setPixelRatio(P),e.setSize(T.width,T.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){a=k,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){l=k,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(k){u=k},this.getBaseLayer=function(){return p!==null?p:_},this.getBinding=function(){return f},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(k){if(s=k,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",ne),s.addEventListener("inputsourceschange",L),g.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(T),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const q={antialias:s.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};_=new XRWebGLLayer(s,t,q),s.updateRenderState({baseLayer:_}),e.setPixelRatio(1),e.setSize(_.framebufferWidth,_.framebufferHeight,!1),m=new WebGLRenderTarget(_.framebufferWidth,_.framebufferHeight,{format:RGBAFormat,type:UnsignedByteType,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let q=null,ae=null,pe=null;g.depth&&(pe=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,q=g.stencil?DepthStencilFormat:DepthFormat,ae=g.stencil?UnsignedInt248Type:UnsignedIntType);const de={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:a};f=new XRWebGLBinding(s,t),p=f.createProjectionLayer(de),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),m=new WebGLRenderTarget(p.textureWidth,p.textureHeight,{format:RGBAFormat,type:UnsignedByteType,depthTexture:new DepthTexture(p.textureWidth,p.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const be=e.properties.get(m);be.__ignoreDepthValues=p.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(c),u=null,o=await s.requestReferenceSpace(l),ee.setContext(s),ee.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(k){for(let q=0;q<k.removed.length;q++){const ae=k.removed[q],pe=E.indexOf(ae);pe>=0&&(E[pe]=null,b[pe].disconnect(ae))}for(let q=0;q<k.added.length;q++){const ae=k.added[q];let pe=E.indexOf(ae);if(pe===-1){for(let be=0;be<b.length;be++)if(be>=E.length){E.push(ae),pe=be;break}else if(E[be]===null){E[be]=ae,pe=be;break}if(pe===-1)break}const de=b[pe];de&&de.connect(ae)}}const B=new Vector3,G=new Vector3;function $(k,q,ae){B.setFromMatrixPosition(q.matrixWorld),G.setFromMatrixPosition(ae.matrixWorld);const pe=B.distanceTo(G),de=q.projectionMatrix.elements,be=ae.projectionMatrix.elements,Ce=de[14]/(de[10]-1),Se=de[14]/(de[10]+1),Ne=(de[9]+1)/de[5],U=(de[9]-1)/de[5],Ze=(de[8]-1)/de[0],_e=(be[8]+1)/be[0],Te=Ce*Ze,ue=Ce*_e,He=pe/(-Ze+_e),Le=He*-Ze;q.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Le),k.translateZ(He),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();const M=Ce+He,v=Se+He,F=Te-Le,Z=ue+(pe-Le),K=Ne*Se/v*M,Q=U*Se/v*M;k.projectionMatrix.makePerspective(F,Z,K,Q,M,v),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}function z(k,q){q===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(q.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(s===null)return;y.near=w.near=C.near=k.near,y.far=w.far=C.far=k.far,(A!==y.near||V!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),A=y.near,V=y.far);const q=k.parent,ae=y.cameras;z(y,q);for(let pe=0;pe<ae.length;pe++)z(ae[pe],q);ae.length===2?$(y,C,w):y.projectionMatrix.copy(C.projectionMatrix),W(k,y,q)};function W(k,q,ae){ae===null?k.matrix.copy(q.matrixWorld):(k.matrix.copy(ae.matrixWorld),k.matrix.invert(),k.matrix.multiply(q.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(q.projectionMatrix),k.projectionMatrixInverse.copy(q.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=RAD2DEG*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(p===null&&_===null))return c},this.setFoveation=function(k){c=k,p!==null&&(p.fixedFoveation=k),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=k)};let X=null;function J(k,q){if(h=q.getViewerPose(u||o),x=q,h!==null){const ae=h.views;_!==null&&(e.setRenderTargetFramebuffer(m,_.framebuffer),e.setRenderTarget(m));let pe=!1;ae.length!==y.cameras.length&&(y.cameras.length=0,pe=!0);for(let de=0;de<ae.length;de++){const be=ae[de];let Ce=null;if(_!==null)Ce=_.getViewport(be);else{const Ne=f.getViewSubImage(p,be);Ce=Ne.viewport,de===0&&(e.setRenderTargetTextures(m,Ne.colorTexture,p.ignoreDepthValues?void 0:Ne.depthStencilTexture),e.setRenderTarget(m))}let Se=Y[de];Se===void 0&&(Se=new PerspectiveCamera,Se.layers.enable(de),Se.viewport=new Vector4,Y[de]=Se),Se.matrix.fromArray(be.transform.matrix),Se.matrix.decompose(Se.position,Se.quaternion,Se.scale),Se.projectionMatrix.fromArray(be.projectionMatrix),Se.projectionMatrixInverse.copy(Se.projectionMatrix).invert(),Se.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),de===0&&(y.matrix.copy(Se.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),pe===!0&&y.cameras.push(Se)}}for(let ae=0;ae<b.length;ae++){const pe=E[ae],de=b[ae];pe!==null&&de!==void 0&&de.update(pe,q,u||o)}X&&X(k,q),q.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:q}),x=null}const ee=new WebGLAnimation;ee.setAnimationLoop(J),this.setAnimationLoop=function(k){X=k},this.dispose=function(){}}}function WebGLMaterials(n,e){function t(d,m){d.matrixAutoUpdate===!0&&d.updateMatrix(),m.value.copy(d.matrix)}function r(d,m){m.color.getRGB(d.fogColor.value,getUnlitUniformColorSpace(n)),m.isFog?(d.fogNear.value=m.near,d.fogFar.value=m.far):m.isFogExp2&&(d.fogDensity.value=m.density)}function s(d,m,b,E,T){m.isMeshBasicMaterial||m.isMeshLambertMaterial?a(d,m):m.isMeshToonMaterial?(a(d,m),f(d,m)):m.isMeshPhongMaterial?(a(d,m),h(d,m)):m.isMeshStandardMaterial?(a(d,m),p(d,m),m.isMeshPhysicalMaterial&&_(d,m,T)):m.isMeshMatcapMaterial?(a(d,m),x(d,m)):m.isMeshDepthMaterial?a(d,m):m.isMeshDistanceMaterial?(a(d,m),g(d,m)):m.isMeshNormalMaterial?a(d,m):m.isLineBasicMaterial?(o(d,m),m.isLineDashedMaterial&&l(d,m)):m.isPointsMaterial?c(d,m,b,E):m.isSpriteMaterial?u(d,m):m.isShadowMaterial?(d.color.value.copy(m.color),d.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(d,m){d.opacity.value=m.opacity,m.color&&d.diffuse.value.copy(m.color),m.emissive&&d.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(d.map.value=m.map,t(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,t(m.alphaMap,d.alphaMapTransform)),m.bumpMap&&(d.bumpMap.value=m.bumpMap,t(m.bumpMap,d.bumpMapTransform),d.bumpScale.value=m.bumpScale,m.side===BackSide&&(d.bumpScale.value*=-1)),m.normalMap&&(d.normalMap.value=m.normalMap,t(m.normalMap,d.normalMapTransform),d.normalScale.value.copy(m.normalScale),m.side===BackSide&&d.normalScale.value.negate()),m.displacementMap&&(d.displacementMap.value=m.displacementMap,t(m.displacementMap,d.displacementMapTransform),d.displacementScale.value=m.displacementScale,d.displacementBias.value=m.displacementBias),m.emissiveMap&&(d.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,d.emissiveMapTransform)),m.specularMap&&(d.specularMap.value=m.specularMap,t(m.specularMap,d.specularMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);const b=e.get(m).envMap;if(b&&(d.envMap.value=b,d.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=m.reflectivity,d.ior.value=m.ior,d.refractionRatio.value=m.refractionRatio),m.lightMap){d.lightMap.value=m.lightMap;const E=n._useLegacyLights===!0?Math.PI:1;d.lightMapIntensity.value=m.lightMapIntensity*E,t(m.lightMap,d.lightMapTransform)}m.aoMap&&(d.aoMap.value=m.aoMap,d.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,d.aoMapTransform))}function o(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,m.map&&(d.map.value=m.map,t(m.map,d.mapTransform))}function l(d,m){d.dashSize.value=m.dashSize,d.totalSize.value=m.dashSize+m.gapSize,d.scale.value=m.scale}function c(d,m,b,E){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.size.value=m.size*b,d.scale.value=E*.5,m.map&&(d.map.value=m.map,t(m.map,d.uvTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,t(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function u(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.rotation.value=m.rotation,m.map&&(d.map.value=m.map,t(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,t(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function h(d,m){d.specular.value.copy(m.specular),d.shininess.value=Math.max(m.shininess,1e-4)}function f(d,m){m.gradientMap&&(d.gradientMap.value=m.gradientMap)}function p(d,m){d.metalness.value=m.metalness,m.metalnessMap&&(d.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,d.metalnessMapTransform)),d.roughness.value=m.roughness,m.roughnessMap&&(d.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,d.roughnessMapTransform)),e.get(m).envMap&&(d.envMapIntensity.value=m.envMapIntensity)}function _(d,m,b){d.ior.value=m.ior,m.sheen>0&&(d.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),d.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(d.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,d.sheenColorMapTransform)),m.sheenRoughnessMap&&(d.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,d.sheenRoughnessMapTransform))),m.clearcoat>0&&(d.clearcoat.value=m.clearcoat,d.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(d.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,d.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(d.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===BackSide&&d.clearcoatNormalScale.value.negate())),m.iridescence>0&&(d.iridescence.value=m.iridescence,d.iridescenceIOR.value=m.iridescenceIOR,d.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(d.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,d.iridescenceMapTransform)),m.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),m.transmission>0&&(d.transmission.value=m.transmission,d.transmissionSamplerMap.value=b.texture,d.transmissionSamplerSize.value.set(b.width,b.height),m.transmissionMap&&(d.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,d.transmissionMapTransform)),d.thickness.value=m.thickness,m.thicknessMap&&(d.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=m.attenuationDistance,d.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(d.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(d.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=m.specularIntensity,d.specularColor.value.copy(m.specularColor),m.specularColorMap&&(d.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,d.specularColorMapTransform)),m.specularIntensityMap&&(d.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,d.specularIntensityMapTransform))}function x(d,m){m.matcap&&(d.matcap.value=m.matcap)}function g(d,m){const b=e.get(m).light;d.referencePosition.value.setFromMatrixPosition(b.matrixWorld),d.nearDistance.value=b.shadow.camera.near,d.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:s}}function WebGLUniformsGroups(n,e,t,r){let s={},a={},o=[];const l=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(b,E){const T=E.program;r.uniformBlockBinding(b,T)}function u(b,E){let T=s[b.id];T===void 0&&(x(b),T=h(b),s[b.id]=T,b.addEventListener("dispose",d));const P=E.program;r.updateUBOMapping(b,P);const C=e.render.frame;a[b.id]!==C&&(p(b),a[b.id]=C)}function h(b){const E=f();b.__bindingPointIndex=E;const T=n.createBuffer(),P=b.__size,C=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,P,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,T),T}function f(){for(let b=0;b<l;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(b){const E=s[b.id],T=b.uniforms,P=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let C=0,w=T.length;C<w;C++){const Y=Array.isArray(T[C])?T[C]:[T[C]];for(let y=0,A=Y.length;y<A;y++){const V=Y[y];if(_(V,C,y,P)===!0){const H=V.__offset,ne=Array.isArray(V.value)?V.value:[V.value];let L=0;for(let B=0;B<ne.length;B++){const G=ne[B],$=g(G);typeof G=="number"||typeof G=="boolean"?(V.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,H+L,V.__data)):G.isMatrix3?(V.__data[0]=G.elements[0],V.__data[1]=G.elements[1],V.__data[2]=G.elements[2],V.__data[3]=0,V.__data[4]=G.elements[3],V.__data[5]=G.elements[4],V.__data[6]=G.elements[5],V.__data[7]=0,V.__data[8]=G.elements[6],V.__data[9]=G.elements[7],V.__data[10]=G.elements[8],V.__data[11]=0):(G.toArray(V.__data,L),L+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,V.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function _(b,E,T,P){const C=b.value,w=E+"_"+T;if(P[w]===void 0)return typeof C=="number"||typeof C=="boolean"?P[w]=C:P[w]=C.clone(),!0;{const Y=P[w];if(typeof C=="number"||typeof C=="boolean"){if(Y!==C)return P[w]=C,!0}else if(Y.equals(C)===!1)return Y.copy(C),!0}return!1}function x(b){const E=b.uniforms;let T=0;const P=16;for(let w=0,Y=E.length;w<Y;w++){const y=Array.isArray(E[w])?E[w]:[E[w]];for(let A=0,V=y.length;A<V;A++){const H=y[A],ne=Array.isArray(H.value)?H.value:[H.value];for(let L=0,B=ne.length;L<B;L++){const G=ne[L],$=g(G),z=T%P;z!==0&&P-z<$.boundary&&(T+=P-z),H.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=T,T+=$.storage}}}const C=T%P;return C>0&&(T+=P-C),b.__size=T,b.__cache={},this}function g(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function d(b){const E=b.target;E.removeEventListener("dispose",d);const T=o.indexOf(E.__bindingPointIndex);o.splice(T,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete a[E.id]}function m(){for(const b in s)n.deleteBuffer(s[b]);o=[],s={},a={}}return{bind:c,update:u,dispose:m}}class WebGLRenderer{constructor(e={}){const{canvas:t=createCanvasElement(),context:r=null,depth:s=!0,stencil:a=!0,alpha:o=!1,antialias:l=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let p;r!==null?p=r.getContextAttributes().alpha:p=o;const _=new Uint32Array(4),x=new Int32Array(4);let g=null,d=null;const m=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=SRGBColorSpace,this._useLegacyLights=!1,this.toneMapping=NoToneMapping,this.toneMappingExposure=1;const E=this;let T=!1,P=0,C=0,w=null,Y=-1,y=null;const A=new Vector4,V=new Vector4;let H=null;const ne=new Color(0);let L=0,B=t.width,G=t.height,$=1,z=null,W=null;const X=new Vector4(0,0,B,G),J=new Vector4(0,0,B,G);let ee=!1;const k=new Frustum;let q=!1,ae=!1,pe=null;const de=new Matrix4,be=new Vector2,Ce=new Vector3,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ne(){return w===null?$:1}let U=r;function Ze(S,D){for(let N=0;N<S.length;N++){const O=S[N],I=t.getContext(O,D);if(I!==null)return I}return null}try{const S={alpha:!0,depth:s,stencil:a,antialias:l,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${REVISION}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",R,!1),t.addEventListener("webglcontextcreationerror",ie,!1),U===null){const D=["webgl2","webgl","experimental-webgl"];if(E.isWebGL1Renderer===!0&&D.shift(),U=Ze(D,S),U===null)throw Ze(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let _e,Te,ue,He,Le,M,v,F,Z,K,Q,he,se,le,ve,Pe,j,Be,Fe,ye,me,ce,Re,Oe;function $e(){_e=new WebGLExtensions(U),Te=new WebGLCapabilities(U,_e,e),_e.init(Te),ce=new WebGLUtils(U,_e,Te),ue=new WebGLState(U,_e,Te),He=new WebGLInfo(U),Le=new WebGLProperties,M=new WebGLTextures(U,_e,ue,Le,Te,ce,He),v=new WebGLCubeMaps(E),F=new WebGLCubeUVMaps(E),Z=new WebGLAttributes(U,Te),Re=new WebGLBindingStates(U,_e,Z,Te),K=new WebGLGeometries(U,Z,He,Re),Q=new WebGLObjects(U,K,Z,He),Fe=new WebGLMorphtargets(U,Te,M),Pe=new WebGLClipping(Le),he=new WebGLPrograms(E,v,F,_e,Te,Re,Pe),se=new WebGLMaterials(E,Le),le=new WebGLRenderLists,ve=new WebGLRenderStates(_e,Te),Be=new WebGLBackground(E,v,F,ue,Q,p,c),j=new WebGLShadowMap(E,Q,Te),Oe=new WebGLUniformsGroups(U,He,Te,ue),ye=new WebGLBufferRenderer(U,_e,He,Te),me=new WebGLIndexedBufferRenderer(U,_e,He,Te),He.programs=he.programs,E.capabilities=Te,E.extensions=_e,E.properties=Le,E.renderLists=le,E.shadowMap=j,E.state=ue,E.info=He}$e();const Ue=new WebXRManager(E,U);this.xr=Ue,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const S=_e.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=_e.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(S){S!==void 0&&($=S,this.setSize(B,G,!1))},this.getSize=function(S){return S.set(B,G)},this.setSize=function(S,D,N=!0){if(Ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=S,G=D,t.width=Math.floor(S*$),t.height=Math.floor(D*$),N===!0&&(t.style.width=S+"px",t.style.height=D+"px"),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(B*$,G*$).floor()},this.setDrawingBufferSize=function(S,D,N){B=S,G=D,$=N,t.width=Math.floor(S*N),t.height=Math.floor(D*N),this.setViewport(0,0,S,D)},this.getCurrentViewport=function(S){return S.copy(A)},this.getViewport=function(S){return S.copy(X)},this.setViewport=function(S,D,N,O){S.isVector4?X.set(S.x,S.y,S.z,S.w):X.set(S,D,N,O),ue.viewport(A.copy(X).multiplyScalar($).floor())},this.getScissor=function(S){return S.copy(J)},this.setScissor=function(S,D,N,O){S.isVector4?J.set(S.x,S.y,S.z,S.w):J.set(S,D,N,O),ue.scissor(V.copy(J).multiplyScalar($).floor())},this.getScissorTest=function(){return ee},this.setScissorTest=function(S){ue.setScissorTest(ee=S)},this.setOpaqueSort=function(S){z=S},this.setTransparentSort=function(S){W=S},this.getClearColor=function(S){return S.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor.apply(Be,arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha.apply(Be,arguments)},this.clear=function(S=!0,D=!0,N=!0){let O=0;if(S){let I=!1;if(w!==null){const oe=w.texture.format;I=oe===RGBAIntegerFormat||oe===RGIntegerFormat||oe===RedIntegerFormat}if(I){const oe=w.texture.type,fe=oe===UnsignedByteType||oe===UnsignedIntType||oe===UnsignedShortType||oe===UnsignedInt248Type||oe===UnsignedShort4444Type||oe===UnsignedShort5551Type,xe=Be.getClearColor(),Me=Be.getClearAlpha(),De=xe.r,Ae=xe.g,we=xe.b;fe?(_[0]=De,_[1]=Ae,_[2]=we,_[3]=Me,U.clearBufferuiv(U.COLOR,0,_)):(x[0]=De,x[1]=Ae,x[2]=we,x[3]=Me,U.clearBufferiv(U.COLOR,0,x))}else O|=U.COLOR_BUFFER_BIT}D&&(O|=U.DEPTH_BUFFER_BIT),N&&(O|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",R,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),le.dispose(),ve.dispose(),Le.dispose(),v.dispose(),F.dispose(),Q.dispose(),Re.dispose(),Oe.dispose(),he.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",Qe),Ue.removeEventListener("sessionend",Ve),pe&&(pe.dispose(),pe=null),Je.stop()};function te(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function R(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const S=He.autoReset,D=j.enabled,N=j.autoUpdate,O=j.needsUpdate,I=j.type;$e(),He.autoReset=S,j.enabled=D,j.autoUpdate=N,j.needsUpdate=O,j.type=I}function ie(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function re(S){const D=S.target;D.removeEventListener("dispose",re),Ee(D)}function Ee(S){ge(S),Le.remove(S)}function ge(S){const D=Le.get(S).programs;D!==void 0&&(D.forEach(function(N){he.releaseProgram(N)}),S.isShaderMaterial&&he.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,N,O,I,oe){D===null&&(D=Se);const fe=I.isMesh&&I.matrixWorld.determinant()<0,xe=bt(S,D,N,O,I);ue.setMaterial(O,fe);let Me=N.index,De=1;if(O.wireframe===!0){if(Me=K.getWireframeAttribute(N),Me===void 0)return;De=2}const Ae=N.drawRange,we=N.attributes.position;let qe=Ae.start*De,et=(Ae.start+Ae.count)*De;oe!==null&&(qe=Math.max(qe,oe.start*De),et=Math.min(et,(oe.start+oe.count)*De)),Me!==null?(qe=Math.max(qe,0),et=Math.min(et,Me.count)):we!=null&&(qe=Math.max(qe,0),et=Math.min(et,we.count));const je=et-qe;if(je<0||je===1/0)return;Re.setup(I,O,xe,N,Me);let it,We=ye;if(Me!==null&&(it=Z.get(Me),We=me,We.setIndex(it)),I.isMesh)O.wireframe===!0?(ue.setLineWidth(O.wireframeLinewidth*Ne()),We.setMode(U.LINES)):We.setMode(U.TRIANGLES);else if(I.isLine){let Ie=O.linewidth;Ie===void 0&&(Ie=1),ue.setLineWidth(Ie*Ne()),I.isLineSegments?We.setMode(U.LINES):I.isLineLoop?We.setMode(U.LINE_LOOP):We.setMode(U.LINE_STRIP)}else I.isPoints?We.setMode(U.POINTS):I.isSprite&&We.setMode(U.TRIANGLES);if(I.isBatchedMesh)We.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else if(I.isInstancedMesh)We.renderInstances(qe,je,I.count);else if(N.isInstancedBufferGeometry){const Ie=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,ht=Math.min(N.instanceCount,Ie);We.renderInstances(qe,je,ht)}else We.render(qe,je)};function ke(S,D,N){S.transparent===!0&&S.side===DoubleSide&&S.forceSinglePass===!1?(S.side=BackSide,S.needsUpdate=!0,ct(S,D,N),S.side=FrontSide,S.needsUpdate=!0,ct(S,D,N),S.side=DoubleSide):ct(S,D,N)}this.compile=function(S,D,N=null){N===null&&(N=S),d=ve.get(N),d.init(),b.push(d),N.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),S!==N&&S.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),d.setupLights(E._useLegacyLights);const O=new Set;return S.traverse(function(I){const oe=I.material;if(oe)if(Array.isArray(oe))for(let fe=0;fe<oe.length;fe++){const xe=oe[fe];ke(xe,N,I),O.add(xe)}else ke(oe,N,I),O.add(oe)}),b.pop(),d=null,O},this.compileAsync=function(S,D,N=null){const O=this.compile(S,D,N);return new Promise(I=>{function oe(){if(O.forEach(function(fe){Le.get(fe).currentProgram.isReady()&&O.delete(fe)}),O.size===0){I(S);return}setTimeout(oe,10)}_e.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let Ge=null;function Ye(S){Ge&&Ge(S)}function Qe(){Je.stop()}function Ve(){Je.start()}const Je=new WebGLAnimation;Je.setAnimationLoop(Ye),typeof self<"u"&&Je.setContext(self),this.setAnimationLoop=function(S){Ge=S,Ue.setAnimationLoop(S),S===null?Je.stop():Je.start()},Ue.addEventListener("sessionstart",Qe),Ue.addEventListener("sessionend",Ve),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(D),D=Ue.getCamera()),S.isScene===!0&&S.onBeforeRender(E,S,D,w),d=ve.get(S,b.length),d.init(),b.push(d),de.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),k.setFromProjectionMatrix(de),ae=this.localClippingEnabled,q=Pe.init(this.clippingPlanes,ae),g=le.get(S,m.length),g.init(),m.push(g),nt(S,D,0,E.sortObjects),g.finish(),E.sortObjects===!0&&g.sort(z,W),this.info.render.frame++,q===!0&&Pe.beginShadows();const N=d.state.shadowsArray;if(j.render(N,S,D),q===!0&&Pe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Be.render(g,S),d.setupLights(E._useLegacyLights),D.isArrayCamera){const O=D.cameras;for(let I=0,oe=O.length;I<oe;I++){const fe=O[I];_t(g,S,fe,fe.viewport)}}else _t(g,S,D);w!==null&&(M.updateMultisampleRenderTarget(w),M.updateRenderTargetMipmap(w)),S.isScene===!0&&S.onAfterRender(E,S,D),Re.resetDefaultState(),Y=-1,y=null,b.pop(),b.length>0?d=b[b.length-1]:d=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function nt(S,D,N,O){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)N=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)d.pushLight(S),S.castShadow&&d.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||k.intersectsSprite(S)){O&&Ce.setFromMatrixPosition(S.matrixWorld).applyMatrix4(de);const fe=Q.update(S),xe=S.material;xe.visible&&g.push(S,fe,xe,N,Ce.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||k.intersectsObject(S))){const fe=Q.update(S),xe=S.material;if(O&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ce.copy(S.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),Ce.copy(fe.boundingSphere.center)),Ce.applyMatrix4(S.matrixWorld).applyMatrix4(de)),Array.isArray(xe)){const Me=fe.groups;for(let De=0,Ae=Me.length;De<Ae;De++){const we=Me[De],qe=xe[we.materialIndex];qe&&qe.visible&&g.push(S,fe,qe,N,Ce.z,we)}}else xe.visible&&g.push(S,fe,xe,N,Ce.z,null)}}const oe=S.children;for(let fe=0,xe=oe.length;fe<xe;fe++)nt(oe[fe],D,N,O)}function _t(S,D,N,O){const I=S.opaque,oe=S.transmissive,fe=S.transparent;d.setupLightsView(N),q===!0&&Pe.setGlobalState(E.clippingPlanes,N),oe.length>0&&At(I,oe,D,N),O&&ue.viewport(A.copy(O)),I.length>0&&lt(I,D,N),oe.length>0&&lt(oe,D,N),fe.length>0&&lt(fe,D,N),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function At(S,D,N,O){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;const oe=Te.isWebGL2;pe===null&&(pe=new WebGLRenderTarget(1,1,{generateMipmaps:!0,type:_e.has("EXT_color_buffer_half_float")?HalfFloatType:UnsignedByteType,minFilter:LinearMipmapLinearFilter,samples:oe?4:0})),E.getDrawingBufferSize(be),oe?pe.setSize(be.x,be.y):pe.setSize(floorPowerOfTwo(be.x),floorPowerOfTwo(be.y));const fe=E.getRenderTarget();E.setRenderTarget(pe),E.getClearColor(ne),L=E.getClearAlpha(),L<1&&E.setClearColor(16777215,.5),E.clear();const xe=E.toneMapping;E.toneMapping=NoToneMapping,lt(S,N,O),M.updateMultisampleRenderTarget(pe),M.updateRenderTargetMipmap(pe);let Me=!1;for(let De=0,Ae=D.length;De<Ae;De++){const we=D[De],qe=we.object,et=we.geometry,je=we.material,it=we.group;if(je.side===DoubleSide&&qe.layers.test(O.layers)){const We=je.side;je.side=BackSide,je.needsUpdate=!0,gt(qe,N,O,et,je,it),je.side=We,je.needsUpdate=!0,Me=!0}}Me===!0&&(M.updateMultisampleRenderTarget(pe),M.updateRenderTargetMipmap(pe)),E.setRenderTarget(fe),E.setClearColor(ne,L),E.toneMapping=xe}function lt(S,D,N){const O=D.isScene===!0?D.overrideMaterial:null;for(let I=0,oe=S.length;I<oe;I++){const fe=S[I],xe=fe.object,Me=fe.geometry,De=O===null?fe.material:O,Ae=fe.group;xe.layers.test(N.layers)&&gt(xe,D,N,Me,De,Ae)}}function gt(S,D,N,O,I,oe){S.onBeforeRender(E,D,N,O,I,oe),S.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),I.onBeforeRender(E,D,N,O,S,oe),I.transparent===!0&&I.side===DoubleSide&&I.forceSinglePass===!1?(I.side=BackSide,I.needsUpdate=!0,E.renderBufferDirect(N,D,O,I,S,oe),I.side=FrontSide,I.needsUpdate=!0,E.renderBufferDirect(N,D,O,I,S,oe),I.side=DoubleSide):E.renderBufferDirect(N,D,O,I,S,oe),S.onAfterRender(E,D,N,O,I,oe)}function ct(S,D,N){D.isScene!==!0&&(D=Se);const O=Le.get(S),I=d.state.lights,oe=d.state.shadowsArray,fe=I.state.version,xe=he.getParameters(S,I.state,oe,D,N),Me=he.getProgramCacheKey(xe);let De=O.programs;O.environment=S.isMeshStandardMaterial?D.environment:null,O.fog=D.fog,O.envMap=(S.isMeshStandardMaterial?F:v).get(S.envMap||O.environment),De===void 0&&(S.addEventListener("dispose",re),De=new Map,O.programs=De);let Ae=De.get(Me);if(Ae!==void 0){if(O.currentProgram===Ae&&O.lightsStateVersion===fe)return vt(S,xe),Ae}else xe.uniforms=he.getUniforms(S),S.onBuild(N,xe,E),S.onBeforeCompile(xe,E),Ae=he.acquireProgram(xe,Me),De.set(Me,Ae),O.uniforms=xe.uniforms;const we=O.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(we.clippingPlanes=Pe.uniform),vt(S,xe),O.needsLights=Ct(S),O.lightsStateVersion=fe,O.needsLights&&(we.ambientLightColor.value=I.state.ambient,we.lightProbe.value=I.state.probe,we.directionalLights.value=I.state.directional,we.directionalLightShadows.value=I.state.directionalShadow,we.spotLights.value=I.state.spot,we.spotLightShadows.value=I.state.spotShadow,we.rectAreaLights.value=I.state.rectArea,we.ltc_1.value=I.state.rectAreaLTC1,we.ltc_2.value=I.state.rectAreaLTC2,we.pointLights.value=I.state.point,we.pointLightShadows.value=I.state.pointShadow,we.hemisphereLights.value=I.state.hemi,we.directionalShadowMap.value=I.state.directionalShadowMap,we.directionalShadowMatrix.value=I.state.directionalShadowMatrix,we.spotShadowMap.value=I.state.spotShadowMap,we.spotLightMatrix.value=I.state.spotLightMatrix,we.spotLightMap.value=I.state.spotLightMap,we.pointShadowMap.value=I.state.pointShadowMap,we.pointShadowMatrix.value=I.state.pointShadowMatrix),O.currentProgram=Ae,O.uniformsList=null,Ae}function xt(S){if(S.uniformsList===null){const D=S.currentProgram.getUniforms();S.uniformsList=WebGLUniforms.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function vt(S,D){const N=Le.get(S);N.outputColorSpace=D.outputColorSpace,N.batching=D.batching,N.instancing=D.instancing,N.instancingColor=D.instancingColor,N.skinning=D.skinning,N.morphTargets=D.morphTargets,N.morphNormals=D.morphNormals,N.morphColors=D.morphColors,N.morphTargetsCount=D.morphTargetsCount,N.numClippingPlanes=D.numClippingPlanes,N.numIntersection=D.numClipIntersection,N.vertexAlphas=D.vertexAlphas,N.vertexTangents=D.vertexTangents,N.toneMapping=D.toneMapping}function bt(S,D,N,O,I){D.isScene!==!0&&(D=Se),M.resetTextureUnits();const oe=D.fog,fe=O.isMeshStandardMaterial?D.environment:null,xe=w===null?E.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:LinearSRGBColorSpace,Me=(O.isMeshStandardMaterial?F:v).get(O.envMap||fe),De=O.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,Ae=!!N.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),we=!!N.morphAttributes.position,qe=!!N.morphAttributes.normal,et=!!N.morphAttributes.color;let je=NoToneMapping;O.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(je=E.toneMapping);const it=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,We=it!==void 0?it.length:0,Ie=Le.get(O),ht=d.state.lights;if(q===!0&&(ae===!0||S!==y)){const tt=S===y&&O.id===Y;Pe.setState(O,S,tt)}let Xe=!1;O.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==ht.state.version||Ie.outputColorSpace!==xe||I.isBatchedMesh&&Ie.batching===!1||!I.isBatchedMesh&&Ie.batching===!0||I.isInstancedMesh&&Ie.instancing===!1||!I.isInstancedMesh&&Ie.instancing===!0||I.isSkinnedMesh&&Ie.skinning===!1||!I.isSkinnedMesh&&Ie.skinning===!0||I.isInstancedMesh&&Ie.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Ie.instancingColor===!1&&I.instanceColor!==null||Ie.envMap!==Me||O.fog===!0&&Ie.fog!==oe||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==Pe.numPlanes||Ie.numIntersection!==Pe.numIntersection)||Ie.vertexAlphas!==De||Ie.vertexTangents!==Ae||Ie.morphTargets!==we||Ie.morphNormals!==qe||Ie.morphColors!==et||Ie.toneMapping!==je||Te.isWebGL2===!0&&Ie.morphTargetsCount!==We)&&(Xe=!0):(Xe=!0,Ie.__version=O.version);let rt=Ie.currentProgram;Xe===!0&&(rt=ct(O,D,I));let St=!1,ot=!1,ft=!1;const Ke=rt.getUniforms(),st=Ie.uniforms;if(ue.useProgram(rt.program)&&(St=!0,ot=!0,ft=!0),O.id!==Y&&(Y=O.id,ot=!0),St||y!==S){Ke.setValue(U,"projectionMatrix",S.projectionMatrix),Ke.setValue(U,"viewMatrix",S.matrixWorldInverse);const tt=Ke.map.cameraPosition;tt!==void 0&&tt.setValue(U,Ce.setFromMatrixPosition(S.matrixWorld)),Te.logarithmicDepthBuffer&&Ke.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Ke.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,ot=!0,ft=!0)}if(I.isSkinnedMesh){Ke.setOptional(U,I,"bindMatrix"),Ke.setOptional(U,I,"bindMatrixInverse");const tt=I.skeleton;tt&&(Te.floatVertexTextures?(tt.boneTexture===null&&tt.computeBoneTexture(),Ke.setValue(U,"boneTexture",tt.boneTexture,M)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}I.isBatchedMesh&&(Ke.setOptional(U,I,"batchingTexture"),Ke.setValue(U,"batchingTexture",I._matricesTexture,M));const dt=N.morphAttributes;if((dt.position!==void 0||dt.normal!==void 0||dt.color!==void 0&&Te.isWebGL2===!0)&&Fe.update(I,N,rt),(ot||Ie.receiveShadow!==I.receiveShadow)&&(Ie.receiveShadow=I.receiveShadow,Ke.setValue(U,"receiveShadow",I.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(st.envMap.value=Me,st.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),ot&&(Ke.setValue(U,"toneMappingExposure",E.toneMappingExposure),Ie.needsLights&&wt(st,ft),oe&&O.fog===!0&&se.refreshFogUniforms(st,oe),se.refreshMaterialUniforms(st,O,$,G,pe),WebGLUniforms.upload(U,xt(Ie),st,M)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(WebGLUniforms.upload(U,xt(Ie),st,M),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Ke.setValue(U,"center",I.center),Ke.setValue(U,"modelViewMatrix",I.modelViewMatrix),Ke.setValue(U,"normalMatrix",I.normalMatrix),Ke.setValue(U,"modelMatrix",I.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const tt=O.uniformsGroups;for(let pt=0,Rt=tt.length;pt<Rt;pt++)if(Te.isWebGL2){const Et=tt[pt];Oe.update(Et,rt),Oe.bind(Et,rt)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return rt}function wt(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function Ct(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(S,D,N){Le.get(S.texture).__webglTexture=D,Le.get(S.depthTexture).__webglTexture=N;const O=Le.get(S);O.__hasExternalTextures=!0,O.__hasExternalTextures&&(O.__autoAllocateDepthBuffer=N===void 0,O.__autoAllocateDepthBuffer||_e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,D){const N=Le.get(S);N.__webglFramebuffer=D,N.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,N=0){w=S,P=D,C=N;let O=!0,I=null,oe=!1,fe=!1;if(S){const Me=Le.get(S);Me.__useDefaultFramebuffer!==void 0?(ue.bindFramebuffer(U.FRAMEBUFFER,null),O=!1):Me.__webglFramebuffer===void 0?M.setupRenderTarget(S):Me.__hasExternalTextures&&M.rebindTextures(S,Le.get(S.texture).__webglTexture,Le.get(S.depthTexture).__webglTexture);const De=S.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(fe=!0);const Ae=Le.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ae[D])?I=Ae[D][N]:I=Ae[D],oe=!0):Te.isWebGL2&&S.samples>0&&M.useMultisampledRTT(S)===!1?I=Le.get(S).__webglMultisampledFramebuffer:Array.isArray(Ae)?I=Ae[N]:I=Ae,A.copy(S.viewport),V.copy(S.scissor),H=S.scissorTest}else A.copy(X).multiplyScalar($).floor(),V.copy(J).multiplyScalar($).floor(),H=ee;if(ue.bindFramebuffer(U.FRAMEBUFFER,I)&&Te.drawBuffers&&O&&ue.drawBuffers(S,I),ue.viewport(A),ue.scissor(V),ue.setScissorTest(H),oe){const Me=Le.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,Me.__webglTexture,N)}else if(fe){const Me=Le.get(S.texture),De=D||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Me.__webglTexture,N||0,De)}Y=-1},this.readRenderTargetPixels=function(S,D,N,O,I,oe,fe){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Le.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&fe!==void 0&&(xe=xe[fe]),xe){ue.bindFramebuffer(U.FRAMEBUFFER,xe);try{const Me=S.texture,De=Me.format,Ae=Me.type;if(De!==RGBAFormat&&ce.convert(De)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const we=Ae===HalfFloatType&&(_e.has("EXT_color_buffer_half_float")||Te.isWebGL2&&_e.has("EXT_color_buffer_float"));if(Ae!==UnsignedByteType&&ce.convert(Ae)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ae===FloatType&&(Te.isWebGL2||_e.has("OES_texture_float")||_e.has("WEBGL_color_buffer_float")))&&!we){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-O&&N>=0&&N<=S.height-I&&U.readPixels(D,N,O,I,ce.convert(De),ce.convert(Ae),oe)}finally{const Me=w!==null?Le.get(w).__webglFramebuffer:null;ue.bindFramebuffer(U.FRAMEBUFFER,Me)}}},this.copyFramebufferToTexture=function(S,D,N=0){const O=Math.pow(2,-N),I=Math.floor(D.image.width*O),oe=Math.floor(D.image.height*O);M.setTexture2D(D,0),U.copyTexSubImage2D(U.TEXTURE_2D,N,0,0,S.x,S.y,I,oe),ue.unbindTexture()},this.copyTextureToTexture=function(S,D,N,O=0){const I=D.image.width,oe=D.image.height,fe=ce.convert(N.format),xe=ce.convert(N.type);M.setTexture2D(N,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment),D.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,O,S.x,S.y,I,oe,fe,xe,D.image.data):D.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,O,S.x,S.y,D.mipmaps[0].width,D.mipmaps[0].height,fe,D.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,O,S.x,S.y,fe,xe,D.image),O===0&&N.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),ue.unbindTexture()},this.copyTextureToTexture3D=function(S,D,N,O,I=0){if(E.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const oe=S.max.x-S.min.x+1,fe=S.max.y-S.min.y+1,xe=S.max.z-S.min.z+1,Me=ce.convert(O.format),De=ce.convert(O.type);let Ae;if(O.isData3DTexture)M.setTexture3D(O,0),Ae=U.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)M.setTexture2DArray(O,0),Ae=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment);const we=U.getParameter(U.UNPACK_ROW_LENGTH),qe=U.getParameter(U.UNPACK_IMAGE_HEIGHT),et=U.getParameter(U.UNPACK_SKIP_PIXELS),je=U.getParameter(U.UNPACK_SKIP_ROWS),it=U.getParameter(U.UNPACK_SKIP_IMAGES),We=N.isCompressedTexture?N.mipmaps[I]:N.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,We.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,We.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,S.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,S.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,S.min.z),N.isDataTexture||N.isData3DTexture?U.texSubImage3D(Ae,I,D.x,D.y,D.z,oe,fe,xe,Me,De,We.data):N.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Ae,I,D.x,D.y,D.z,oe,fe,xe,Me,We.data)):U.texSubImage3D(Ae,I,D.x,D.y,D.z,oe,fe,xe,Me,De,We),U.pixelStorei(U.UNPACK_ROW_LENGTH,we),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,qe),U.pixelStorei(U.UNPACK_SKIP_PIXELS,et),U.pixelStorei(U.UNPACK_SKIP_ROWS,je),U.pixelStorei(U.UNPACK_SKIP_IMAGES,it),I===0&&O.generateMipmaps&&U.generateMipmap(Ae),ue.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?M.setTextureCube(S,0):S.isData3DTexture?M.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?M.setTexture2DArray(S,0):M.setTexture2D(S,0),ue.unbindTexture()},this.resetState=function(){P=0,C=0,w=null,ue.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return WebGLCoordinateSystem}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===DisplayP3ColorSpace?"display-p3":"srgb",t.unpackColorSpace=ColorManagement.workingColorSpace===LinearDisplayP3ColorSpace?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===SRGBColorSpace?sRGBEncoding:LinearEncoding}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===sRGBEncoding?SRGBColorSpace:LinearSRGBColorSpace}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class WebGL1Renderer extends WebGLRenderer{}WebGL1Renderer.prototype.isWebGL1Renderer=!0;class FogExp2{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Color(e),this.density=t}clone(){return new FogExp2(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Scene extends Object3D{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class LineBasicMaterial extends Material{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Color(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const _start$1=new Vector3,_end$1=new Vector3,_inverseMatrix$1=new Matrix4,_ray$1=new Ray,_sphere$1=new Sphere;class Line extends Object3D{constructor(e=new BufferGeometry,t=new LineBasicMaterial){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let s=1,a=t.count;s<a;s++)_start$1.fromBufferAttribute(t,s-1),_end$1.fromBufferAttribute(t,s),r[s]=r[s-1],r[s]+=_start$1.distanceTo(_end$1);e.setAttribute("lineDistance",new Float32BufferAttribute(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,o=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),_sphere$1.copy(r.boundingSphere),_sphere$1.applyMatrix4(s),_sphere$1.radius+=a,e.ray.intersectsSphere(_sphere$1)===!1)return;_inverseMatrix$1.copy(s).invert(),_ray$1.copy(e.ray).applyMatrix4(_inverseMatrix$1);const l=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=l*l,u=new Vector3,h=new Vector3,f=new Vector3,p=new Vector3,_=this.isLineSegments?2:1,x=r.index,d=r.attributes.position;if(x!==null){const m=Math.max(0,o.start),b=Math.min(x.count,o.start+o.count);for(let E=m,T=b-1;E<T;E+=_){const P=x.getX(E),C=x.getX(E+1);if(u.fromBufferAttribute(d,P),h.fromBufferAttribute(d,C),_ray$1.distanceSqToSegment(u,h,p,f)>c)continue;p.applyMatrix4(this.matrixWorld);const Y=e.ray.origin.distanceTo(p);Y<e.near||Y>e.far||t.push({distance:Y,point:f.clone().applyMatrix4(this.matrixWorld),index:E,face:null,faceIndex:null,object:this})}}else{const m=Math.max(0,o.start),b=Math.min(d.count,o.start+o.count);for(let E=m,T=b-1;E<T;E+=_){if(u.fromBufferAttribute(d,E),h.fromBufferAttribute(d,E+1),_ray$1.distanceSqToSegment(u,h,p,f)>c)continue;p.applyMatrix4(this.matrixWorld);const C=e.ray.origin.distanceTo(p);C<e.near||C>e.far||t.push({distance:C,point:f.clone().applyMatrix4(this.matrixWorld),index:E,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const s=t[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const l=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}}class PointsMaterial extends Material{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Color(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const _inverseMatrix=new Matrix4,_ray=new Ray,_sphere=new Sphere,_position$2=new Vector3;class Points extends Object3D{constructor(e=new BufferGeometry,t=new PointsMaterial){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const r=this.geometry,s=this.matrixWorld,a=e.params.Points.threshold,o=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),_sphere.copy(r.boundingSphere),_sphere.applyMatrix4(s),_sphere.radius+=a,e.ray.intersectsSphere(_sphere)===!1)return;_inverseMatrix.copy(s).invert(),_ray.copy(e.ray).applyMatrix4(_inverseMatrix);const l=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=l*l,u=r.index,f=r.attributes.position;if(u!==null){const p=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let x=p,g=_;x<g;x++){const d=u.getX(x);_position$2.fromBufferAttribute(f,d),testPoint(_position$2,d,c,s,e,t,this)}}else{const p=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let x=p,g=_;x<g;x++)_position$2.fromBufferAttribute(f,x),testPoint(_position$2,x,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const s=t[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const l=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}}function testPoint(n,e,t,r,s,a,o){const l=_ray.distanceSqToPoint(n);if(l<t){const c=new Vector3;_ray.closestPointToPoint(n,c),c.applyMatrix4(r);const u=s.ray.origin.distanceTo(c);if(u<s.near||u>s.far)return;a.push({distance:u,distanceToRay:Math.sqrt(l),point:c,index:e,face:null,object:o})}}class SphereGeometry extends BufferGeometry{constructor(e=1,t=32,r=16,s=0,a=Math.PI*2,o=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:s,phiLength:a,thetaStart:o,thetaLength:l},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const c=Math.min(o+l,Math.PI);let u=0;const h=[],f=new Vector3,p=new Vector3,_=[],x=[],g=[],d=[];for(let m=0;m<=r;m++){const b=[],E=m/r;let T=0;m===0&&o===0?T=.5/t:m===r&&c===Math.PI&&(T=-.5/t);for(let P=0;P<=t;P++){const C=P/t;f.x=-e*Math.cos(s+C*a)*Math.sin(o+E*l),f.y=e*Math.cos(o+E*l),f.z=e*Math.sin(s+C*a)*Math.sin(o+E*l),x.push(f.x,f.y,f.z),p.copy(f).normalize(),g.push(p.x,p.y,p.z),d.push(C+T,1-E),b.push(u++)}h.push(b)}for(let m=0;m<r;m++)for(let b=0;b<t;b++){const E=h[m][b+1],T=h[m][b],P=h[m+1][b],C=h[m+1][b+1];(m!==0||o>0)&&_.push(E,T,C),(m!==r-1||c<Math.PI)&&_.push(T,P,C)}this.setIndex(_),this.setAttribute("position",new Float32BufferAttribute(x,3)),this.setAttribute("normal",new Float32BufferAttribute(g,3)),this.setAttribute("uv",new Float32BufferAttribute(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new SphereGeometry(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Clock{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function now(){return(typeof performance>"u"?Date:performance).now()}class Raycaster{constructor(e,t,r=0,s=1/0){this.ray=new Ray(e,t),this.near=r,this.far=s,this.camera=null,this.layers=new Layers,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,r=[]){return intersectObject(e,this,r,t),r.sort(ascSort),r}intersectObjects(e,t=!0,r=[]){for(let s=0,a=e.length;s<a;s++)intersectObject(e[s],this,r,t);return r.sort(ascSort),r}}function ascSort(n,e){return n.distance-e.distance}function intersectObject(n,e,t,r){if(n.layers.test(e.layers)&&n.raycast(e,t),r===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)intersectObject(s[a],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:REVISION}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=REVISION);const _position=new Vector3,_quaternion=new Quaternion,_scale=new Vector3;class CSS3DObject extends Object3D{constructor(e=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this}}const _matrix=new Matrix4,_matrix2=new Matrix4;class CSS3DRenderer{constructor(e={}){const t=this;let r,s,a,o;const l={camera:{style:""},objects:new WeakMap},c=e.element!==void 0?e.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c;const u=document.createElement("div");u.style.transformOrigin="0 0",u.style.pointerEvents="none",c.appendChild(u);const h=document.createElement("div");h.style.transformStyle="preserve-3d",u.appendChild(h),this.getSize=function(){return{width:r,height:s}},this.render=function(g,d){const m=d.projectionMatrix.elements[5]*o;d.view&&d.view.enabled?(u.style.transform=`translate( ${-d.view.offsetX*(r/d.view.width)}px, ${-d.view.offsetY*(s/d.view.height)}px )`,u.style.transform+=`scale( ${d.view.fullWidth/d.view.width}, ${d.view.fullHeight/d.view.height} )`):u.style.transform="",g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),d.parent===null&&d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld();let b,E;d.isOrthographicCamera&&(b=-(d.right+d.left)/2,E=(d.top+d.bottom)/2);const T=d.view&&d.view.enabled?d.view.height/d.view.fullHeight:1,P=d.isOrthographicCamera?`scale( ${T} )scale(`+m+")translate("+f(b)+"px,"+f(E)+"px)"+p(d.matrixWorldInverse):`scale( ${T} )translateZ(`+m+"px)"+p(d.matrixWorldInverse),w=(d.isPerspectiveCamera?"perspective("+m+"px) ":"")+P+"translate("+a+"px,"+o+"px)";l.camera.style!==w&&(h.style.transform=w,l.camera.style=w),x(g,g,d)},this.setSize=function(g,d){r=g,s=d,a=r/2,o=s/2,c.style.width=g+"px",c.style.height=d+"px",u.style.width=g+"px",u.style.height=d+"px",h.style.width=g+"px",h.style.height=d+"px"};function f(g){return Math.abs(g)<1e-10?0:g}function p(g){const d=g.elements;return"matrix3d("+f(d[0])+","+f(-d[1])+","+f(d[2])+","+f(d[3])+","+f(d[4])+","+f(-d[5])+","+f(d[6])+","+f(d[7])+","+f(d[8])+","+f(-d[9])+","+f(d[10])+","+f(d[11])+","+f(d[12])+","+f(-d[13])+","+f(d[14])+","+f(d[15])+")"}function _(g){const d=g.elements;return"translate(-50%,-50%)"+("matrix3d("+f(d[0])+","+f(d[1])+","+f(d[2])+","+f(d[3])+","+f(-d[4])+","+f(-d[5])+","+f(-d[6])+","+f(-d[7])+","+f(d[8])+","+f(d[9])+","+f(d[10])+","+f(d[11])+","+f(d[12])+","+f(d[13])+","+f(d[14])+","+f(d[15])+")")}function x(g,d,m,b){if(g.isCSS3DObject){const E=g.visible===!0&&g.layers.test(m.layers)===!0;if(g.element.style.display=E===!0?"":"none",E===!0){g.onBeforeRender(t,d,m);let T;g.isCSS3DSprite?(_matrix.copy(m.matrixWorldInverse),_matrix.transpose(),g.rotation2D!==0&&_matrix.multiply(_matrix2.makeRotationZ(g.rotation2D)),g.matrixWorld.decompose(_position,_quaternion,_scale),_matrix.setPosition(_position),_matrix.scale(_scale),_matrix.elements[3]=0,_matrix.elements[7]=0,_matrix.elements[11]=0,_matrix.elements[15]=1,T=_(_matrix)):T=_(g.matrixWorld);const P=g.element,C=l.objects.get(g);if(C===void 0||C.style!==T){P.style.transform=T;const w={style:T};l.objects.set(g,w)}P.parentNode!==h&&h.appendChild(P),g.onAfterRender(t,d,m)}}for(let E=0,T=g.children.length;E<T;E++)x(g.children[E],d,m)}}}const CopyShader={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Pass{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const _camera=new OrthographicCamera(-1,1,1,-1,0,1);class FullscreenTriangleGeometry extends BufferGeometry{constructor(){super(),this.setAttribute("position",new Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Float32BufferAttribute([0,2,0,0,2,0],2))}}const _geometry=new FullscreenTriangleGeometry;class FullScreenQuad{constructor(e){this._mesh=new Mesh(_geometry,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,_camera)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ShaderPass extends Pass{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof ShaderMaterial?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=UniformsUtils.clone(e.uniforms),this.material=new ShaderMaterial({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new FullScreenQuad(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class MaskPass extends Pass{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){const s=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let o,l;this.inverse?(o=0,l=1):(o=1,l=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),a.buffers.stencil.setClear(l),a.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(s.EQUAL,1,4294967295),a.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.buffers.stencil.setLocked(!0)}}class ClearMaskPass extends Pass{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class EffectComposer{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const r=e.getSize(new Vector2);this._width=r.width,this._height=r.height,t=new WebGLRenderTarget(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:HalfFloatType}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ShaderPass(CopyShader),this.copyPass.material.blending=NoBlending,this.clock=new Clock}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let r=!1;for(let s=0,a=this.passes.length;s<a;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),o.needsSwap){if(r){const l=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}MaskPass!==void 0&&(o instanceof MaskPass?r=!0:o instanceof ClearMaskPass&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Vector2);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const r=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(r,s),this.renderTarget2.setSize(r,s);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(r,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class RenderPass extends Pass{constructor(e,t,r=null,s=null,a=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=s,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Color}render(e,t,r){const s=e.autoClear;e.autoClear=!1;let a,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(a=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const LuminosityHighPassShader={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Color(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class UnrealBloomPass extends Pass{constructor(e,t,r,s){super(),this.strength=t!==void 0?t:1,this.radius=r,this.threshold=s,this.resolution=e!==void 0?new Vector2(e.x,e.y):new Vector2(256,256),this.clearColor=new Color(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new WebGLRenderTarget(a,o,{type:HalfFloatType}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const p=new WebGLRenderTarget(a,o,{type:HalfFloatType});p.texture.name="UnrealBloomPass.h"+f,p.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(p);const _=new WebGLRenderTarget(a,o,{type:HalfFloatType});_.texture.name="UnrealBloomPass.v"+f,_.texture.generateMipmaps=!1,this.renderTargetsVertical.push(_),a=Math.round(a/2),o=Math.round(o/2)}const l=LuminosityHighPassShader;this.highPassUniforms=UniformsUtils.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ShaderMaterial({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new Vector2(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new Vector3(1,1,1),new Vector3(1,1,1),new Vector3(1,1,1),new Vector3(1,1,1),new Vector3(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=CopyShader;this.copyUniforms=UniformsUtils.clone(h.uniforms),this.blendMaterial=new ShaderMaterial({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:AdditiveBlending,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Color,this.oldClearAlpha=1,this.basic=new MeshBasicMaterial,this.fsQuad=new FullScreenQuad(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let r=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(r,s);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(r,s),this.renderTargetsVertical[a].setSize(r,s),this.separableBlurMaterials[a].uniforms.invSize.value=new Vector2(1/r,1/s),r=Math.round(r/2),s=Math.round(s/2)}render(e,t,r,s,a){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=r.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let l=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=l.texture,this.separableBlurMaterials[c].uniforms.direction.value=UnrealBloomPass.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=UnrealBloomPass.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),l=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(r),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(e*e))/e);return new ShaderMaterial({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Vector2(.5,.5)},direction:{value:new Vector2(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new ShaderMaterial({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}UnrealBloomPass.BlurDirectionX=new Vector2(1,0);UnrealBloomPass.BlurDirectionY=new Vector2(0,1);function _getDefaults(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let _defaults=_getDefaults();function changeDefaults(n){_defaults=n}const escapeTest=/[&<>"']/,escapeReplace=new RegExp(escapeTest.source,"g"),escapeTestNoEncode=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode=new RegExp(escapeTestNoEncode.source,"g"),escapeReplacements={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},getEscapeReplacement=n=>escapeReplacements[n];function escape$1(n,e){if(e){if(escapeTest.test(n))return n.replace(escapeReplace,getEscapeReplacement)}else if(escapeTestNoEncode.test(n))return n.replace(escapeReplaceNoEncode,getEscapeReplacement);return n}const unescapeTest=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function unescape(n){return n.replace(unescapeTest,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const caret=/(^|[^\[])\^/g;function edit(n,e){let t=typeof n=="string"?n:n.source;e=e||"";const r={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(caret,"$1"),t=t.replace(s,o),r},getRegex:()=>new RegExp(t,e)};return r}function cleanUrl(n){try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}const noopTest={exec:()=>null};function splitCells(n,e){const t=n.replace(/\|/g,(a,o,l)=>{let c=!1,u=o;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),r=t.split(/ \|/);let s=0;if(r[0].trim()||r.shift(),r.length>0&&!r[r.length-1].trim()&&r.pop(),e)if(r.length>e)r.splice(e);else for(;r.length<e;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(/\\\|/g,"|");return r}function rtrim(n,e,t){const r=n.length;if(r===0)return"";let s=0;for(;s<r&&n.charAt(r-s-1)===e;)s++;return n.slice(0,r-s)}function findClosingBracket(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let r=0;r<n.length;r++)if(n[r]==="\\")r++;else if(n[r]===e[0])t++;else if(n[r]===e[1]&&(t--,t<0))return r;return-1}function outputLink(n,e,t,r){const s=e.href,a=e.title?escape$1(e.title):null,o=n[1].replace(/\\([\[\]])/g,"$1");if(n[0].charAt(0)!=="!"){r.state.inLink=!0;const l={type:"link",raw:t,href:s,title:a,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,l}return{type:"image",raw:t,href:s,title:a,text:escape$1(o)}}function indentCodeCompensation(n,e){const t=n.match(/^(\s+)(?:```)/);if(t===null)return e;const r=t[1];return e.split(`
`).map(s=>{const a=s.match(/^\s+/);if(a===null)return s;const[o]=a;return o.length>=r.length?s.slice(r.length):s}).join(`
`)}class _Tokenizer{constructor(e){ze(this,"options");ze(this,"rules");ze(this,"lexer");this.options=e||_defaults}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const r=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:rtrim(r,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const r=t[0],s=indentCodeCompensation(r,t[3]||"");return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(/#$/.test(r)){const s=rtrim(r,"#");(this.options.pedantic||!s||/ $/.test(s))&&(r=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){const r=rtrim(t[0].replace(/^ *>[ \t]?/gm,""),`
`),s=this.lexer.state.top;this.lexer.state.top=!0;const a=this.lexer.blockTokens(r);return this.lexer.state.top=s,{type:"blockquote",raw:t[0],tokens:a,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim();const s=r.length>1,a={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");const o=new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`);let l="",c="",u=!1;for(;e;){let h=!1;if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let f=t[2].split(`
`,1)[0].replace(/^\t+/,m=>" ".repeat(3*m.length)),p=e.split(`
`,1)[0],_=0;this.options.pedantic?(_=2,c=f.trimStart()):(_=t[2].search(/[^ ]/),_=_>4?1:_,c=f.slice(_),_+=t[1].length);let x=!1;if(!f&&/^ *$/.test(p)&&(l+=p+`
`,e=e.substring(p.length+1),h=!0),!h){const m=new RegExp(`^ {0,${Math.min(3,_-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),b=new RegExp(`^ {0,${Math.min(3,_-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),E=new RegExp(`^ {0,${Math.min(3,_-1)}}(?:\`\`\`|~~~)`),T=new RegExp(`^ {0,${Math.min(3,_-1)}}#`);for(;e;){const P=e.split(`
`,1)[0];if(p=P,this.options.pedantic&&(p=p.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),E.test(p)||T.test(p)||m.test(p)||b.test(e))break;if(p.search(/[^ ]/)>=_||!p.trim())c+=`
`+p.slice(_);else{if(x||f.search(/[^ ]/)>=4||E.test(f)||T.test(f)||b.test(f))break;c+=`
`+p}!x&&!p.trim()&&(x=!0),l+=P+`
`,e=e.substring(P.length+1),f=p.slice(_)}}a.loose||(u?a.loose=!0:/\n *\n *$/.test(l)&&(u=!0));let g=null,d;this.options.gfm&&(g=/^\[[ xX]\] /.exec(c),g&&(d=g[0]!=="[ ] ",c=c.replace(/^\[[ xX]\] +/,""))),a.items.push({type:"list_item",raw:l,task:!!g,checked:d,loose:!1,text:c,tokens:[]}),a.raw+=l}a.items[a.items.length-1].raw=l.trimEnd(),a.items[a.items.length-1].text=c.trimEnd(),a.raw=a.raw.trimEnd();for(let h=0;h<a.items.length;h++)if(this.lexer.state.top=!1,a.items[h].tokens=this.lexer.blockTokens(a.items[h].text,[]),!a.loose){const f=a.items[h].tokens.filter(_=>_.type==="space"),p=f.length>0&&f.some(_=>/\n.*\n/.test(_.raw));a.loose=p}if(a.loose)for(let h=0;h<a.items.length;h++)a.items[h].loose=!0;return a}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const r=t[1].toLowerCase().replace(/\s+/g," "),s=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:s,title:a}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const r=splitCells(t[1]),s=t[2].replace(/^\||\| *$/g,"").split("|"),a=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===s.length){for(const l of s)/^ *-+: *$/.test(l)?o.align.push("right"):/^ *:-+: *$/.test(l)?o.align.push("center"):/^ *:-+ *$/.test(l)?o.align.push("left"):o.align.push(null);for(const l of r)o.header.push({text:l,tokens:this.lexer.inline(l)});for(const l of a)o.rows.push(splitCells(l,o.header.length).map(c=>({text:c,tokens:this.lexer.inline(c)})));return o}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:escape$1(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const r=t[2].trim();if(!this.options.pedantic&&/^</.test(r)){if(!/>$/.test(r))return;const o=rtrim(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{const o=findClosingBracket(t[2],"()");if(o>-1){const c=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,c).trim(),t[3]=""}}let s=t[2],a="";if(this.options.pedantic){const o=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);o&&(s=o[1],a=o[3])}else a=t[3]?t[3].slice(1,-1):"";return s=s.trim(),/^</.test(s)&&(this.options.pedantic&&!/>$/.test(r)?s=s.slice(1):s=s.slice(1,-1)),outputLink(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){const s=(r[2]||r[1]).replace(/\s+/g," "),a=t[s.toLowerCase()];if(!a){const o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return outputLink(r,a,r[0],this.lexer)}}emStrong(e,t,r=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&r.match(/[\p{L}\p{N}]/u))return;if(!(s[1]||s[2]||"")||!r||this.rules.inline.punctuation.exec(r)){const o=[...s[0]].length-1;let l,c,u=o,h=0;const f=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,t=t.slice(-1*e.length+o);(s=f.exec(t))!=null;){if(l=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!l)continue;if(c=[...l].length,s[3]||s[4]){u+=c;continue}else if((s[5]||s[6])&&o%3&&!((o+c)%3)){h+=c;continue}if(u-=c,u>0)continue;c=Math.min(c,c+u+h);const p=[...s[0]][0].length,_=e.slice(0,o+s.index+p+c);if(Math.min(o,c)%2){const g=_.slice(1,-1);return{type:"em",raw:_,text:g,tokens:this.lexer.inlineTokens(g)}}const x=_.slice(2,-2);return{type:"strong",raw:_,text:x,tokens:this.lexer.inlineTokens(x)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(/\n/g," ");const s=/[^ ]/.test(r),a=/^ /.test(r)&&/ $/.test(r);return s&&a&&(r=r.substring(1,r.length-1)),r=escape$1(r,!0),{type:"codespan",raw:t[0],text:r}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let r,s;return t[2]==="@"?(r=escape$1(t[1]),s="mailto:"+r):(r=escape$1(t[1]),s=r),{type:"link",raw:t[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}url(e){var r;let t;if(t=this.rules.inline.url.exec(e)){let s,a;if(t[2]==="@")s=escape$1(t[0]),a="mailto:"+s;else{let o;do o=t[0],t[0]=((r=this.rules.inline._backpedal.exec(t[0]))==null?void 0:r[0])??"";while(o!==t[0]);s=escape$1(t[0]),t[1]==="www."?a="http://"+t[0]:a=t[0]}return{type:"link",raw:t[0],text:s,href:a,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let r;return this.lexer.state.inRawBlock?r=t[0]:r=escape$1(t[0]),{type:"text",raw:t[0],text:r}}}}const newline$1=/^(?: *(?:\n|$))+/,blockCode=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,bullet=/(?:[*+-]|\d{1,9}[.)])/,lheading=edit(/^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,bullet).getRegex(),_paragraph=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,blockText=/^[^\n]+/,_blockLabel=/(?!\s*\])(?:\\.|[^\[\]\\])+/,def=edit(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",_blockLabel).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),list=edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,bullet).getRegex(),_tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",_comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,html=edit("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",_comment).replace("tag",_tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),paragraph=edit(_paragraph).replace("hr",hr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_tag).getRegex(),blockquote=edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",paragraph).getRegex(),blockNormal={blockquote,code:blockCode,def,fences,heading,hr,html,lheading,list,newline:newline$1,paragraph,table:noopTest,text:blockText},gfmTable=edit("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",hr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_tag).getRegex(),blockGfm={...blockNormal,table:gfmTable,paragraph:edit(_paragraph).replace("hr",hr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",gfmTable).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_tag).getRegex()},blockPedantic={...blockNormal,html:edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",_comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:noopTest,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:edit(_paragraph).replace("hr",hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",lheading).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},escape=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,inlineCode=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br=/^( {2,}|\\)\n(?!\s*$)/,inlineText=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,_punctuation="\\p{P}$+<=>`^|~",punctuation=edit(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,_punctuation).getRegex(),blockSkip=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,emStrongLDelim=edit(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,_punctuation).getRegex(),emStrongRDelimAst=edit("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,_punctuation).getRegex(),emStrongRDelimUnd=edit("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,_punctuation).getRegex(),anyPunctuation=edit(/\\([punct])/,"gu").replace(/punct/g,_punctuation).getRegex(),autolink=edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),_inlineComment=edit(_comment).replace("(?:-->|$)","-->").getRegex(),tag=edit("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",_inlineComment).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),_inlineLabel=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,link=edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",_inlineLabel).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),reflink=edit(/^!?\[(label)\]\[(ref)\]/).replace("label",_inlineLabel).replace("ref",_blockLabel).getRegex(),nolink=edit(/^!?\[(ref)\](?:\[\])?/).replace("ref",_blockLabel).getRegex(),reflinkSearch=edit("reflink|nolink(?!\\()","g").replace("reflink",reflink).replace("nolink",nolink).getRegex(),inlineNormal={_backpedal:noopTest,anyPunctuation,autolink,blockSkip,br,code:inlineCode,del:noopTest,emStrongLDelim,emStrongRDelimAst,emStrongRDelimUnd,escape,link,nolink,punctuation,reflink,reflinkSearch,tag,text:inlineText,url:noopTest},inlinePedantic={...inlineNormal,link:edit(/^!?\[(label)\]\((.*?)\)/).replace("label",_inlineLabel).getRegex(),reflink:edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",_inlineLabel).getRegex()},inlineGfm={...inlineNormal,escape:edit(escape).replace("])","~|])").getRegex(),url:edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},inlineBreaks={...inlineGfm,br:edit(br).replace("{2,}","*").getRegex(),text:edit(inlineGfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},block={normal:blockNormal,gfm:blockGfm,pedantic:blockPedantic},inline={normal:inlineNormal,gfm:inlineGfm,breaks:inlineBreaks,pedantic:inlinePedantic};class _Lexer{constructor(e){ze(this,"tokens");ze(this,"options");ze(this,"state");ze(this,"tokenizer");ze(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||_defaults,this.options.tokenizer=this.options.tokenizer||new _Tokenizer,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:block.normal,inline:inline.normal};this.options.pedantic?(t.block=block.pedantic,t.inline=inline.pedantic):this.options.gfm&&(t.block=block.gfm,this.options.breaks?t.inline=inline.breaks:t.inline=inline.gfm),this.tokenizer.rules=t}static get rules(){return{block,inline}}static lex(e,t){return new _Lexer(t).lex(e)}static lexInline(e,t){return new _Lexer(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const r=this.inlineQueue[t];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(l,c,u)=>c+"    ".repeat(u.length));let r,s,a,o;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(r=l.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))){if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length),r.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length),s=t[t.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+r.raw,s.text+=`
`+r.text,this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length),s=t[t.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+r.raw,s.text+=`
`+r.raw,this.inlineQueue[this.inlineQueue.length-1].src=s.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(a=e,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const c=e.slice(1);let u;this.options.extensions.startBlock.forEach(h=>{u=h.call({lexer:this},c),typeof u=="number"&&u>=0&&(l=Math.min(l,u))}),l<1/0&&l>=0&&(a=e.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(a))){s=t[t.length-1],o&&s.type==="paragraph"?(s.raw+=`
`+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(r),o=a.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length),s=t[t.length-1],s&&s.type==="text"?(s.raw+=`
`+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(r);continue}if(e){const l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let r,s,a,o=e,l,c,u;if(this.tokens.links){const h=Object.keys(this.tokens.links);if(h.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(o))!=null;)h.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(o))!=null;)o=o.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(o))!=null;)o=o.slice(0,l.index)+"++"+o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(c||(u=""),c=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(h=>(r=h.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))){if(r=this.tokenizer.escape(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.tag(e)){e=e.substring(r.raw.length),s=t[t.length-1],s&&r.type==="text"&&s.type==="text"?(s.raw+=r.raw,s.text+=r.text):t.push(r);continue}if(r=this.tokenizer.link(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(r.raw.length),s=t[t.length-1],s&&r.type==="text"&&s.type==="text"?(s.raw+=r.raw,s.text+=r.text):t.push(r);continue}if(r=this.tokenizer.emStrong(e,o,u)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.codespan(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.br(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.del(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.autolink(e)){e=e.substring(r.raw.length),t.push(r);continue}if(!this.state.inLink&&(r=this.tokenizer.url(e))){e=e.substring(r.raw.length),t.push(r);continue}if(a=e,this.options.extensions&&this.options.extensions.startInline){let h=1/0;const f=e.slice(1);let p;this.options.extensions.startInline.forEach(_=>{p=_.call({lexer:this},f),typeof p=="number"&&p>=0&&(h=Math.min(h,p))}),h<1/0&&h>=0&&(a=e.substring(0,h+1))}if(r=this.tokenizer.inlineText(a)){e=e.substring(r.raw.length),r.raw.slice(-1)!=="_"&&(u=r.raw.slice(-1)),c=!0,s=t[t.length-1],s&&s.type==="text"?(s.raw+=r.raw,s.text+=r.text):t.push(r);continue}if(e){const h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return t}}class _Renderer{constructor(e){ze(this,"options");this.options=e||_defaults}code(e,t,r){var a;const s=(a=(t||"").match(/^\S*/))==null?void 0:a[0];return e=e.replace(/\n$/,"")+`
`,s?'<pre><code class="language-'+escape$1(s)+'">'+(r?e:escape$1(e,!0))+`</code></pre>
`:"<pre><code>"+(r?e:escape$1(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,t){return e}heading(e,t,r){return`<h${t}>${e}</h${t}>
`}hr(){return`<hr>
`}list(e,t,r){const s=t?"ol":"ul",a=t&&r!==1?' start="'+r+'"':"";return"<"+s+a+`>
`+e+"</"+s+`>
`}listitem(e,t,r){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(e){return`<p>${e}</p>
`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,t){const r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,r){const s=cleanUrl(e);if(s===null)return r;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+t+'"'),a+=">"+r+"</a>",a}image(e,t,r){const s=cleanUrl(e);if(s===null)return r;e=s;let a=`<img src="${e}" alt="${r}"`;return t&&(a+=` title="${t}"`),a+=">",a}text(e){return e}}class _TextRenderer{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,r){return""+r}image(e,t,r){return""+r}br(){return""}}class _Parser{constructor(e){ze(this,"options");ze(this,"renderer");ze(this,"textRenderer");this.options=e||_defaults,this.options.renderer=this.options.renderer||new _Renderer,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new _TextRenderer}static parse(e,t){return new _Parser(t).parse(e)}static parseInline(e,t){return new _Parser(t).parseInline(e)}parse(e,t=!0){let r="";for(let s=0;s<e.length;s++){const a=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){const o=a,l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(o.type)){r+=l||"";continue}}switch(a.type){case"space":continue;case"hr":{r+=this.renderer.hr();continue}case"heading":{const o=a;r+=this.renderer.heading(this.parseInline(o.tokens),o.depth,unescape(this.parseInline(o.tokens,this.textRenderer)));continue}case"code":{const o=a;r+=this.renderer.code(o.text,o.lang,!!o.escaped);continue}case"table":{const o=a;let l="",c="";for(let h=0;h<o.header.length;h++)c+=this.renderer.tablecell(this.parseInline(o.header[h].tokens),{header:!0,align:o.align[h]});l+=this.renderer.tablerow(c);let u="";for(let h=0;h<o.rows.length;h++){const f=o.rows[h];c="";for(let p=0;p<f.length;p++)c+=this.renderer.tablecell(this.parseInline(f[p].tokens),{header:!1,align:o.align[p]});u+=this.renderer.tablerow(c)}r+=this.renderer.table(l,u);continue}case"blockquote":{const o=a,l=this.parse(o.tokens);r+=this.renderer.blockquote(l);continue}case"list":{const o=a,l=o.ordered,c=o.start,u=o.loose;let h="";for(let f=0;f<o.items.length;f++){const p=o.items[f],_=p.checked,x=p.task;let g="";if(p.task){const d=this.renderer.checkbox(!!_);u?p.tokens.length>0&&p.tokens[0].type==="paragraph"?(p.tokens[0].text=d+" "+p.tokens[0].text,p.tokens[0].tokens&&p.tokens[0].tokens.length>0&&p.tokens[0].tokens[0].type==="text"&&(p.tokens[0].tokens[0].text=d+" "+p.tokens[0].tokens[0].text)):p.tokens.unshift({type:"text",text:d+" "}):g+=d+" "}g+=this.parse(p.tokens,u),h+=this.renderer.listitem(g,x,!!_)}r+=this.renderer.list(h,l,c);continue}case"html":{const o=a;r+=this.renderer.html(o.text,o.block);continue}case"paragraph":{const o=a;r+=this.renderer.paragraph(this.parseInline(o.tokens));continue}case"text":{let o=a,l=o.tokens?this.parseInline(o.tokens):o.text;for(;s+1<e.length&&e[s+1].type==="text";)o=e[++s],l+=`
`+(o.tokens?this.parseInline(o.tokens):o.text);r+=t?this.renderer.paragraph(l):l;continue}default:{const o='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,t){t=t||this.renderer;let r="";for(let s=0;s<e.length;s++){const a=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){const o=this.options.extensions.renderers[a.type].call({parser:this},a);if(o!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){r+=o||"";continue}}switch(a.type){case"escape":{const o=a;r+=t.text(o.text);break}case"html":{const o=a;r+=t.html(o.text);break}case"link":{const o=a;r+=t.link(o.href,o.title,this.parseInline(o.tokens,t));break}case"image":{const o=a;r+=t.image(o.href,o.title,o.text);break}case"strong":{const o=a;r+=t.strong(this.parseInline(o.tokens,t));break}case"em":{const o=a;r+=t.em(this.parseInline(o.tokens,t));break}case"codespan":{const o=a;r+=t.codespan(o.text);break}case"br":{r+=t.br();break}case"del":{const o=a;r+=t.del(this.parseInline(o.tokens,t));break}case"text":{const o=a;r+=t.text(o.text);break}default:{const o='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}}class _Hooks{constructor(e){ze(this,"options");this.options=e||_defaults}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}ze(_Hooks,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var at,mt,Tt;class Marked{constructor(...e){yt(this,at);ze(this,"defaults",_getDefaults());ze(this,"options",this.setOptions);ze(this,"parse",ut(this,at,mt).call(this,_Lexer.lex,_Parser.parse));ze(this,"parseInline",ut(this,at,mt).call(this,_Lexer.lexInline,_Parser.parseInline));ze(this,"Parser",_Parser);ze(this,"Renderer",_Renderer);ze(this,"TextRenderer",_TextRenderer);ze(this,"Lexer",_Lexer);ze(this,"Tokenizer",_Tokenizer);ze(this,"Hooks",_Hooks);this.use(...e)}walkTokens(e,t){var s,a;let r=[];for(const o of e)switch(r=r.concat(t.call(this,o)),o.type){case"table":{const l=o;for(const c of l.header)r=r.concat(this.walkTokens(c.tokens,t));for(const c of l.rows)for(const u of c)r=r.concat(this.walkTokens(u.tokens,t));break}case"list":{const l=o;r=r.concat(this.walkTokens(l.items,t));break}default:{const l=o;(a=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&a[l.type]?this.defaults.extensions.childTokens[l.type].forEach(c=>{const u=l[c].flat(1/0);r=r.concat(this.walkTokens(u,t))}):l.tokens&&(r=r.concat(this.walkTokens(l.tokens,t)))}}return r}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{const s={...r};if(s.async=this.defaults.async||s.async||!1,r.extensions&&(r.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){const o=t.renderers[a.name];o?t.renderers[a.name]=function(...l){let c=a.renderer.apply(this,l);return c===!1&&(c=o.apply(this,l)),c}:t.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const o=t[a.level];o?o.unshift(a.tokenizer):t[a.level]=[a.tokenizer],a.start&&(a.level==="block"?t.startBlock?t.startBlock.push(a.start):t.startBlock=[a.start]:a.level==="inline"&&(t.startInline?t.startInline.push(a.start):t.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(t.childTokens[a.name]=a.childTokens)}),s.extensions=t),r.renderer){const a=this.defaults.renderer||new _Renderer(this.defaults);for(const o in r.renderer){if(!(o in a))throw new Error(`renderer '${o}' does not exist`);if(o==="options")continue;const l=o,c=r.renderer[l],u=a[l];a[l]=(...h)=>{let f=c.apply(a,h);return f===!1&&(f=u.apply(a,h)),f||""}}s.renderer=a}if(r.tokenizer){const a=this.defaults.tokenizer||new _Tokenizer(this.defaults);for(const o in r.tokenizer){if(!(o in a))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;const l=o,c=r.tokenizer[l],u=a[l];a[l]=(...h)=>{let f=c.apply(a,h);return f===!1&&(f=u.apply(a,h)),f}}s.tokenizer=a}if(r.hooks){const a=this.defaults.hooks||new _Hooks;for(const o in r.hooks){if(!(o in a))throw new Error(`hook '${o}' does not exist`);if(o==="options")continue;const l=o,c=r.hooks[l],u=a[l];_Hooks.passThroughHooks.has(o)?a[l]=h=>{if(this.defaults.async)return Promise.resolve(c.call(a,h)).then(p=>u.call(a,p));const f=c.call(a,h);return u.call(a,f)}:a[l]=(...h)=>{let f=c.apply(a,h);return f===!1&&(f=u.apply(a,h)),f}}s.hooks=a}if(r.walkTokens){const a=this.defaults.walkTokens,o=r.walkTokens;s.walkTokens=function(l){let c=[];return c.push(o.call(this,l)),a&&(c=c.concat(a.call(this,l))),c}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return _Lexer.lex(e,t??this.defaults)}parser(e,t){return _Parser.parse(e,t??this.defaults)}}at=new WeakSet,mt=function(e,t){return(r,s)=>{const a={...s},o={...this.defaults,...a};this.defaults.async===!0&&a.async===!1&&(o.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),o.async=!0);const l=ut(this,at,Tt).call(this,!!o.silent,!!o.async);if(typeof r>"u"||r===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof r!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected"));if(o.hooks&&(o.hooks.options=o),o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(r):r).then(c=>e(c,o)).then(c=>o.hooks?o.hooks.processAllTokens(c):c).then(c=>o.walkTokens?Promise.all(this.walkTokens(c,o.walkTokens)).then(()=>c):c).then(c=>t(c,o)).then(c=>o.hooks?o.hooks.postprocess(c):c).catch(l);try{o.hooks&&(r=o.hooks.preprocess(r));let c=e(r,o);o.hooks&&(c=o.hooks.processAllTokens(c)),o.walkTokens&&this.walkTokens(c,o.walkTokens);let u=t(c,o);return o.hooks&&(u=o.hooks.postprocess(u)),u}catch(c){return l(c)}}},Tt=function(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+escape$1(r.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(r);throw r}};const markedInstance=new Marked;function marked(n,e){return markedInstance.parse(n,e)}marked.options=marked.setOptions=function(n){return markedInstance.setOptions(n),marked.defaults=markedInstance.defaults,changeDefaults(marked.defaults),marked};marked.getDefaults=_getDefaults;marked.defaults=_defaults;marked.use=function(...n){return markedInstance.use(...n),marked.defaults=markedInstance.defaults,changeDefaults(marked.defaults),marked};marked.walkTokens=function(n,e){return markedInstance.walkTokens(n,e)};marked.parseInline=markedInstance.parseInline;marked.Parser=_Parser;marked.parser=_Parser.parse;marked.Renderer=_Renderer;marked.TextRenderer=_TextRenderer;marked.Lexer=_Lexer;marked.lexer=_Lexer.lex;marked.Tokenizer=_Tokenizer;marked.Hooks=_Hooks;marked.parse=marked;marked.options;marked.setOptions;marked.use;marked.walkTokens;marked.parseInline;_Parser.parse;_Lexer.lex;function getDefaultExportFromCjs(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function getAugmentedNamespace(n){if(n.__esModule)return n;var e=n.default;if(typeof e=="function"){var t=function r(){return this instanceof r?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(n).forEach(function(r){var s=Object.getOwnPropertyDescriptor(n,r);Object.defineProperty(t,r,s.get?s:{enumerable:!0,get:function(){return n[r]}})}),t}const __viteBrowserExternal={},__viteBrowserExternal$1=Object.freeze(Object.defineProperty({__proto__:null,default:__viteBrowserExternal},Symbol.toStringTag,{value:"Module"})),require$$0=getAugmentedNamespace(__viteBrowserExternal$1);var toString=Object.prototype.toString,kindOf=function(e){if(e===void 0)return"undefined";if(e===null)return"null";var t=typeof e;if(t==="boolean")return"boolean";if(t==="string")return"string";if(t==="number")return"number";if(t==="symbol")return"symbol";if(t==="function")return isGeneratorFn(e)?"generatorfunction":"function";if(isArray(e))return"array";if(isBuffer$1(e))return"buffer";if(isArguments(e))return"arguments";if(isDate(e))return"date";if(isError(e))return"error";if(isRegexp(e))return"regexp";switch(ctorName(e)){case"Symbol":return"symbol";case"Promise":return"promise";case"WeakMap":return"weakmap";case"WeakSet":return"weakset";case"Map":return"map";case"Set":return"set";case"Int8Array":return"int8array";case"Uint8Array":return"uint8array";case"Uint8ClampedArray":return"uint8clampedarray";case"Int16Array":return"int16array";case"Uint16Array":return"uint16array";case"Int32Array":return"int32array";case"Uint32Array":return"uint32array";case"Float32Array":return"float32array";case"Float64Array":return"float64array"}if(isGeneratorObj(e))return"generator";switch(t=toString.call(e),t){case"[object Object]":return"object";case"[object Map Iterator]":return"mapiterator";case"[object Set Iterator]":return"setiterator";case"[object String Iterator]":return"stringiterator";case"[object Array Iterator]":return"arrayiterator"}return t.slice(8,-1).toLowerCase().replace(/\s/g,"")};function ctorName(n){return typeof n.constructor=="function"?n.constructor.name:null}function isArray(n){return Array.isArray?Array.isArray(n):n instanceof Array}function isError(n){return n instanceof Error||typeof n.message=="string"&&n.constructor&&typeof n.constructor.stackTraceLimit=="number"}function isDate(n){return n instanceof Date?!0:typeof n.toDateString=="function"&&typeof n.getDate=="function"&&typeof n.setDate=="function"}function isRegexp(n){return n instanceof RegExp?!0:typeof n.flags=="string"&&typeof n.ignoreCase=="boolean"&&typeof n.multiline=="boolean"&&typeof n.global=="boolean"}function isGeneratorFn(n,e){return ctorName(n)==="GeneratorFunction"}function isGeneratorObj(n){return typeof n.throw=="function"&&typeof n.return=="function"&&typeof n.next=="function"}function isArguments(n){try{if(typeof n.length=="number"&&typeof n.callee=="function")return!0}catch(e){if(e.message.indexOf("callee")!==-1)return!0}return!1}function isBuffer$1(n){return n.constructor&&typeof n.constructor.isBuffer=="function"?n.constructor.isBuffer(n):!1}/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var isExtendable=function(e){return typeof e<"u"&&e!==null&&(typeof e=="object"||typeof e=="function")},isObject$1=isExtendable,extendShallow=function(e){isObject$1(e)||(e={});for(var t=arguments.length,r=1;r<t;r++){var s=arguments[r];isObject$1(s)&&assign(e,s)}return e};function assign(n,e){for(var t in e)hasOwn(e,t)&&(n[t]=e[t])}function hasOwn(n,e){return Object.prototype.hasOwnProperty.call(n,e)}var typeOf$2=kindOf,extend$1=extendShallow,sectionMatter=function(n,e){typeof e=="function"&&(e={parse:e});var t=toObject(n),r={section_delimiter:"---",parse:identity},s=extend$1({},r,e),a=s.section_delimiter,o=t.content.split(/\r?\n/),l=null,c=createSection(),u=[],h=[];function f(m){t.content=m,l=[],u=[]}function p(m){h.length&&(c.key=getKey(h[0],a),c.content=m,s.parse(c,l),l.push(c),c=createSection(),u=[],h=[])}for(var _=0;_<o.length;_++){var x=o[_],g=h.length,d=x.trim();if(isDelimiter(d,a)){if(d.length===3&&_!==0){if(g===0||g===2){u.push(x);continue}h.push(d),c.data=u.join(`
`),u=[];continue}l===null&&f(u.join(`
`)),g===2&&p(u.join(`
`)),h.push(d);continue}u.push(x)}return l===null?f(u.join(`
`)):p(u.join(`
`)),t.sections=l,t};function isDelimiter(n,e){return!(n.slice(0,e.length)!==e||n.charAt(e.length+1)===e.slice(-1))}function toObject(n){if(typeOf$2(n)!=="object"&&(n={content:n}),typeof n.content!="string"&&!isBuffer(n.content))throw new TypeError("expected a buffer or string");return n.content=n.content.toString(),n.sections=[],n}function getKey(n,e){return n?n.slice(e.length).trim():""}function createSection(){return{key:"",data:"",content:""}}function identity(n){return n}function isBuffer(n){return n&&n.constructor&&typeof n.constructor.isBuffer=="function"?n.constructor.isBuffer(n):!1}var engines$2={exports:{}},jsYaml$1={},loader$1={},common$6={};function isNothing(n){return typeof n>"u"||n===null}function isObject(n){return typeof n=="object"&&n!==null}function toArray(n){return Array.isArray(n)?n:isNothing(n)?[]:[n]}function extend(n,e){var t,r,s,a;if(e)for(a=Object.keys(e),t=0,r=a.length;t<r;t+=1)s=a[t],n[s]=e[s];return n}function repeat(n,e){var t="",r;for(r=0;r<e;r+=1)t+=n;return t}function isNegativeZero(n){return n===0&&Number.NEGATIVE_INFINITY===1/n}common$6.isNothing=isNothing;common$6.isObject=isObject;common$6.toArray=toArray;common$6.repeat=repeat;common$6.isNegativeZero=isNegativeZero;common$6.extend=extend;function YAMLException$4(n,e){Error.call(this),this.name="YAMLException",this.reason=n,this.mark=e,this.message=(this.reason||"(unknown reason)")+(this.mark?" "+this.mark.toString():""),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}YAMLException$4.prototype=Object.create(Error.prototype);YAMLException$4.prototype.constructor=YAMLException$4;YAMLException$4.prototype.toString=function(e){var t=this.name+": ";return t+=this.reason||"(unknown reason)",!e&&this.mark&&(t+=" "+this.mark.toString()),t};var exception=YAMLException$4,common$5=common$6;function Mark$1(n,e,t,r,s){this.name=n,this.buffer=e,this.position=t,this.line=r,this.column=s}Mark$1.prototype.getSnippet=function(e,t){var r,s,a,o,l;if(!this.buffer)return null;for(e=e||4,t=t||75,r="",s=this.position;s>0&&`\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(s-1))===-1;)if(s-=1,this.position-s>t/2-1){r=" ... ",s+=5;break}for(a="",o=this.position;o<this.buffer.length&&`\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(o))===-1;)if(o+=1,o-this.position>t/2-1){a=" ... ",o-=5;break}return l=this.buffer.slice(s,o),common$5.repeat(" ",e)+r+l+a+`
`+common$5.repeat(" ",e+this.position-s+r.length)+"^"};Mark$1.prototype.toString=function(e){var t,r="";return this.name&&(r+='in "'+this.name+'" '),r+="at line "+(this.line+1)+", column "+(this.column+1),e||(t=this.getSnippet(),t&&(r+=`:
`+t)),r};var mark=Mark$1,YAMLException$3=exception,TYPE_CONSTRUCTOR_OPTIONS=["kind","resolve","construct","instanceOf","predicate","represent","defaultStyle","styleAliases"],YAML_NODE_KINDS=["scalar","sequence","mapping"];function compileStyleAliases(n){var e={};return n!==null&&Object.keys(n).forEach(function(t){n[t].forEach(function(r){e[String(r)]=t})}),e}function Type$h(n,e){if(e=e||{},Object.keys(e).forEach(function(t){if(TYPE_CONSTRUCTOR_OPTIONS.indexOf(t)===-1)throw new YAMLException$3('Unknown option "'+t+'" is met in definition of "'+n+'" YAML type.')}),this.tag=n,this.kind=e.kind||null,this.resolve=e.resolve||function(){return!0},this.construct=e.construct||function(t){return t},this.instanceOf=e.instanceOf||null,this.predicate=e.predicate||null,this.represent=e.represent||null,this.defaultStyle=e.defaultStyle||null,this.styleAliases=compileStyleAliases(e.styleAliases||null),YAML_NODE_KINDS.indexOf(this.kind)===-1)throw new YAMLException$3('Unknown kind "'+this.kind+'" is specified for "'+n+'" YAML type.')}var type=Type$h,common$4=common$6,YAMLException$2=exception,Type$g=type;function compileList(n,e,t){var r=[];return n.include.forEach(function(s){t=compileList(s,e,t)}),n[e].forEach(function(s){t.forEach(function(a,o){a.tag===s.tag&&a.kind===s.kind&&r.push(o)}),t.push(s)}),t.filter(function(s,a){return r.indexOf(a)===-1})}function compileMap(){var n={scalar:{},sequence:{},mapping:{},fallback:{}},e,t;function r(s){n[s.kind][s.tag]=n.fallback[s.tag]=s}for(e=0,t=arguments.length;e<t;e+=1)arguments[e].forEach(r);return n}function Schema$5(n){this.include=n.include||[],this.implicit=n.implicit||[],this.explicit=n.explicit||[],this.implicit.forEach(function(e){if(e.loadKind&&e.loadKind!=="scalar")throw new YAMLException$2("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")}),this.compiledImplicit=compileList(this,"implicit",[]),this.compiledExplicit=compileList(this,"explicit",[]),this.compiledTypeMap=compileMap(this.compiledImplicit,this.compiledExplicit)}Schema$5.DEFAULT=null;Schema$5.create=function(){var e,t;switch(arguments.length){case 1:e=Schema$5.DEFAULT,t=arguments[0];break;case 2:e=arguments[0],t=arguments[1];break;default:throw new YAMLException$2("Wrong number of arguments for Schema.create function")}if(e=common$4.toArray(e),t=common$4.toArray(t),!e.every(function(r){return r instanceof Schema$5}))throw new YAMLException$2("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");if(!t.every(function(r){return r instanceof Type$g}))throw new YAMLException$2("Specified list of YAML types (or a single Type object) contains a non-Type object.");return new Schema$5({include:e,explicit:t})};var schema=Schema$5,Type$f=type,str=new Type$f("tag:yaml.org,2002:str",{kind:"scalar",construct:function(n){return n!==null?n:""}}),Type$e=type,seq=new Type$e("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(n){return n!==null?n:[]}}),Type$d=type,map=new Type$d("tag:yaml.org,2002:map",{kind:"mapping",construct:function(n){return n!==null?n:{}}}),Schema$4=schema,failsafe=new Schema$4({explicit:[str,seq,map]}),Type$c=type;function resolveYamlNull(n){if(n===null)return!0;var e=n.length;return e===1&&n==="~"||e===4&&(n==="null"||n==="Null"||n==="NULL")}function constructYamlNull(){return null}function isNull(n){return n===null}var _null=new Type$c("tag:yaml.org,2002:null",{kind:"scalar",resolve:resolveYamlNull,construct:constructYamlNull,predicate:isNull,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"}},defaultStyle:"lowercase"}),Type$b=type;function resolveYamlBoolean(n){if(n===null)return!1;var e=n.length;return e===4&&(n==="true"||n==="True"||n==="TRUE")||e===5&&(n==="false"||n==="False"||n==="FALSE")}function constructYamlBoolean(n){return n==="true"||n==="True"||n==="TRUE"}function isBoolean(n){return Object.prototype.toString.call(n)==="[object Boolean]"}var bool=new Type$b("tag:yaml.org,2002:bool",{kind:"scalar",resolve:resolveYamlBoolean,construct:constructYamlBoolean,predicate:isBoolean,represent:{lowercase:function(n){return n?"true":"false"},uppercase:function(n){return n?"TRUE":"FALSE"},camelcase:function(n){return n?"True":"False"}},defaultStyle:"lowercase"}),common$3=common$6,Type$a=type;function isHexCode(n){return 48<=n&&n<=57||65<=n&&n<=70||97<=n&&n<=102}function isOctCode(n){return 48<=n&&n<=55}function isDecCode(n){return 48<=n&&n<=57}function resolveYamlInteger(n){if(n===null)return!1;var e=n.length,t=0,r=!1,s;if(!e)return!1;if(s=n[t],(s==="-"||s==="+")&&(s=n[++t]),s==="0"){if(t+1===e)return!0;if(s=n[++t],s==="b"){for(t++;t<e;t++)if(s=n[t],s!=="_"){if(s!=="0"&&s!=="1")return!1;r=!0}return r&&s!=="_"}if(s==="x"){for(t++;t<e;t++)if(s=n[t],s!=="_"){if(!isHexCode(n.charCodeAt(t)))return!1;r=!0}return r&&s!=="_"}for(;t<e;t++)if(s=n[t],s!=="_"){if(!isOctCode(n.charCodeAt(t)))return!1;r=!0}return r&&s!=="_"}if(s==="_")return!1;for(;t<e;t++)if(s=n[t],s!=="_"){if(s===":")break;if(!isDecCode(n.charCodeAt(t)))return!1;r=!0}return!r||s==="_"?!1:s!==":"?!0:/^(:[0-5]?[0-9])+$/.test(n.slice(t))}function constructYamlInteger(n){var e=n,t=1,r,s,a=[];return e.indexOf("_")!==-1&&(e=e.replace(/_/g,"")),r=e[0],(r==="-"||r==="+")&&(r==="-"&&(t=-1),e=e.slice(1),r=e[0]),e==="0"?0:r==="0"?e[1]==="b"?t*parseInt(e.slice(2),2):e[1]==="x"?t*parseInt(e,16):t*parseInt(e,8):e.indexOf(":")!==-1?(e.split(":").forEach(function(o){a.unshift(parseInt(o,10))}),e=0,s=1,a.forEach(function(o){e+=o*s,s*=60}),t*e):t*parseInt(e,10)}function isInteger(n){return Object.prototype.toString.call(n)==="[object Number]"&&n%1===0&&!common$3.isNegativeZero(n)}var int=new Type$a("tag:yaml.org,2002:int",{kind:"scalar",resolve:resolveYamlInteger,construct:constructYamlInteger,predicate:isInteger,represent:{binary:function(n){return n>=0?"0b"+n.toString(2):"-0b"+n.toString(2).slice(1)},octal:function(n){return n>=0?"0"+n.toString(8):"-0"+n.toString(8).slice(1)},decimal:function(n){return n.toString(10)},hexadecimal:function(n){return n>=0?"0x"+n.toString(16).toUpperCase():"-0x"+n.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),common$2=common$6,Type$9=type,YAML_FLOAT_PATTERN=new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function resolveYamlFloat(n){return!(n===null||!YAML_FLOAT_PATTERN.test(n)||n[n.length-1]==="_")}function constructYamlFloat(n){var e,t,r,s;return e=n.replace(/_/g,"").toLowerCase(),t=e[0]==="-"?-1:1,s=[],"+-".indexOf(e[0])>=0&&(e=e.slice(1)),e===".inf"?t===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:e===".nan"?NaN:e.indexOf(":")>=0?(e.split(":").forEach(function(a){s.unshift(parseFloat(a,10))}),e=0,r=1,s.forEach(function(a){e+=a*r,r*=60}),t*e):t*parseFloat(e,10)}var SCIENTIFIC_WITHOUT_DOT=/^[-+]?[0-9]+e/;function representYamlFloat(n,e){var t;if(isNaN(n))switch(e){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===n)switch(e){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===n)switch(e){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(common$2.isNegativeZero(n))return"-0.0";return t=n.toString(10),SCIENTIFIC_WITHOUT_DOT.test(t)?t.replace("e",".e"):t}function isFloat(n){return Object.prototype.toString.call(n)==="[object Number]"&&(n%1!==0||common$2.isNegativeZero(n))}var float=new Type$9("tag:yaml.org,2002:float",{kind:"scalar",resolve:resolveYamlFloat,construct:constructYamlFloat,predicate:isFloat,represent:representYamlFloat,defaultStyle:"lowercase"}),Schema$3=schema,json=new Schema$3({include:[failsafe],implicit:[_null,bool,int,float]}),Schema$2=schema,core=new Schema$2({include:[json]}),Type$8=type,YAML_DATE_REGEXP=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),YAML_TIMESTAMP_REGEXP=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function resolveYamlTimestamp(n){return n===null?!1:YAML_DATE_REGEXP.exec(n)!==null||YAML_TIMESTAMP_REGEXP.exec(n)!==null}function constructYamlTimestamp(n){var e,t,r,s,a,o,l,c=0,u=null,h,f,p;if(e=YAML_DATE_REGEXP.exec(n),e===null&&(e=YAML_TIMESTAMP_REGEXP.exec(n)),e===null)throw new Error("Date resolve error");if(t=+e[1],r=+e[2]-1,s=+e[3],!e[4])return new Date(Date.UTC(t,r,s));if(a=+e[4],o=+e[5],l=+e[6],e[7]){for(c=e[7].slice(0,3);c.length<3;)c+="0";c=+c}return e[9]&&(h=+e[10],f=+(e[11]||0),u=(h*60+f)*6e4,e[9]==="-"&&(u=-u)),p=new Date(Date.UTC(t,r,s,a,o,l,c)),u&&p.setTime(p.getTime()-u),p}function representYamlTimestamp(n){return n.toISOString()}var timestamp=new Type$8("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:resolveYamlTimestamp,construct:constructYamlTimestamp,instanceOf:Date,represent:representYamlTimestamp}),Type$7=type;function resolveYamlMerge(n){return n==="<<"||n===null}var merge=new Type$7("tag:yaml.org,2002:merge",{kind:"scalar",resolve:resolveYamlMerge});function commonjsRequire(n){throw new Error('Could not dynamically require "'+n+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var NodeBuffer;try{var _require$1=commonjsRequire;NodeBuffer=_require$1("buffer").Buffer}catch{}var Type$6=type,BASE64_MAP=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function resolveYamlBinary(n){if(n===null)return!1;var e,t,r=0,s=n.length,a=BASE64_MAP;for(t=0;t<s;t++)if(e=a.indexOf(n.charAt(t)),!(e>64)){if(e<0)return!1;r+=6}return r%8===0}function constructYamlBinary(n){var e,t,r=n.replace(/[\r\n=]/g,""),s=r.length,a=BASE64_MAP,o=0,l=[];for(e=0;e<s;e++)e%4===0&&e&&(l.push(o>>16&255),l.push(o>>8&255),l.push(o&255)),o=o<<6|a.indexOf(r.charAt(e));return t=s%4*6,t===0?(l.push(o>>16&255),l.push(o>>8&255),l.push(o&255)):t===18?(l.push(o>>10&255),l.push(o>>2&255)):t===12&&l.push(o>>4&255),NodeBuffer?NodeBuffer.from?NodeBuffer.from(l):new NodeBuffer(l):l}function representYamlBinary(n){var e="",t=0,r,s,a=n.length,o=BASE64_MAP;for(r=0;r<a;r++)r%3===0&&r&&(e+=o[t>>18&63],e+=o[t>>12&63],e+=o[t>>6&63],e+=o[t&63]),t=(t<<8)+n[r];return s=a%3,s===0?(e+=o[t>>18&63],e+=o[t>>12&63],e+=o[t>>6&63],e+=o[t&63]):s===2?(e+=o[t>>10&63],e+=o[t>>4&63],e+=o[t<<2&63],e+=o[64]):s===1&&(e+=o[t>>2&63],e+=o[t<<4&63],e+=o[64],e+=o[64]),e}function isBinary(n){return NodeBuffer&&NodeBuffer.isBuffer(n)}var binary=new Type$6("tag:yaml.org,2002:binary",{kind:"scalar",resolve:resolveYamlBinary,construct:constructYamlBinary,predicate:isBinary,represent:representYamlBinary}),Type$5=type,_hasOwnProperty$3=Object.prototype.hasOwnProperty,_toString$2=Object.prototype.toString;function resolveYamlOmap(n){if(n===null)return!0;var e={},t,r,s,a,o,l=n;for(t=0,r=l.length;t<r;t+=1){if(s=l[t],o=!1,_toString$2.call(s)!=="[object Object]")return!1;for(a in s)if(_hasOwnProperty$3.call(s,a))if(!o)o=!0;else return!1;if(!o||_hasOwnProperty$3.call(e,a))return!1;Object.defineProperty(e,a,{value:!0})}return!0}function constructYamlOmap(n){return n!==null?n:[]}var omap=new Type$5("tag:yaml.org,2002:omap",{kind:"sequence",resolve:resolveYamlOmap,construct:constructYamlOmap}),Type$4=type,_toString$1=Object.prototype.toString;function resolveYamlPairs(n){if(n===null)return!0;var e,t,r,s,a,o=n;for(a=new Array(o.length),e=0,t=o.length;e<t;e+=1){if(r=o[e],_toString$1.call(r)!=="[object Object]"||(s=Object.keys(r),s.length!==1))return!1;a[e]=[s[0],r[s[0]]]}return!0}function constructYamlPairs(n){if(n===null)return[];var e,t,r,s,a,o=n;for(a=new Array(o.length),e=0,t=o.length;e<t;e+=1)r=o[e],s=Object.keys(r),a[e]=[s[0],r[s[0]]];return a}var pairs=new Type$4("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:resolveYamlPairs,construct:constructYamlPairs}),Type$3=type,_hasOwnProperty$2=Object.prototype.hasOwnProperty;function resolveYamlSet(n){if(n===null)return!0;var e,t=n;for(e in t)if(_hasOwnProperty$2.call(t,e)&&t[e]!==null)return!1;return!0}function constructYamlSet(n){return n!==null?n:{}}var set=new Type$3("tag:yaml.org,2002:set",{kind:"mapping",resolve:resolveYamlSet,construct:constructYamlSet}),Schema$1=schema,default_safe=new Schema$1({include:[core],implicit:[timestamp,merge],explicit:[binary,omap,pairs,set]}),Type$2=type;function resolveJavascriptUndefined(){return!0}function constructJavascriptUndefined(){}function representJavascriptUndefined(){return""}function isUndefined(n){return typeof n>"u"}var _undefined=new Type$2("tag:yaml.org,2002:js/undefined",{kind:"scalar",resolve:resolveJavascriptUndefined,construct:constructJavascriptUndefined,predicate:isUndefined,represent:representJavascriptUndefined}),Type$1=type;function resolveJavascriptRegExp(n){if(n===null||n.length===0)return!1;var e=n,t=/\/([gim]*)$/.exec(n),r="";return!(e[0]==="/"&&(t&&(r=t[1]),r.length>3||e[e.length-r.length-1]!=="/"))}function constructJavascriptRegExp(n){var e=n,t=/\/([gim]*)$/.exec(n),r="";return e[0]==="/"&&(t&&(r=t[1]),e=e.slice(1,e.length-r.length-1)),new RegExp(e,r)}function representJavascriptRegExp(n){var e="/"+n.source+"/";return n.global&&(e+="g"),n.multiline&&(e+="m"),n.ignoreCase&&(e+="i"),e}function isRegExp(n){return Object.prototype.toString.call(n)==="[object RegExp]"}var regexp=new Type$1("tag:yaml.org,2002:js/regexp",{kind:"scalar",resolve:resolveJavascriptRegExp,construct:constructJavascriptRegExp,predicate:isRegExp,represent:representJavascriptRegExp}),esprima;try{var _require=commonjsRequire;esprima=_require("esprima")}catch{typeof window<"u"&&(esprima=window.esprima)}var Type=type;function resolveJavascriptFunction(n){if(n===null)return!1;try{var e="("+n+")",t=esprima.parse(e,{range:!0});return!(t.type!=="Program"||t.body.length!==1||t.body[0].type!=="ExpressionStatement"||t.body[0].expression.type!=="ArrowFunctionExpression"&&t.body[0].expression.type!=="FunctionExpression")}catch{return!1}}function constructJavascriptFunction(n){var e="("+n+")",t=esprima.parse(e,{range:!0}),r=[],s;if(t.type!=="Program"||t.body.length!==1||t.body[0].type!=="ExpressionStatement"||t.body[0].expression.type!=="ArrowFunctionExpression"&&t.body[0].expression.type!=="FunctionExpression")throw new Error("Failed to resolve function");return t.body[0].expression.params.forEach(function(a){r.push(a.name)}),s=t.body[0].expression.body.range,t.body[0].expression.body.type==="BlockStatement"?new Function(r,e.slice(s[0]+1,s[1]-1)):new Function(r,"return "+e.slice(s[0],s[1]))}function representJavascriptFunction(n){return n.toString()}function isFunction(n){return Object.prototype.toString.call(n)==="[object Function]"}var _function=new Type("tag:yaml.org,2002:js/function",{kind:"scalar",resolve:resolveJavascriptFunction,construct:constructJavascriptFunction,predicate:isFunction,represent:representJavascriptFunction}),Schema=schema,default_full=Schema.DEFAULT=new Schema({include:[default_safe],explicit:[_undefined,regexp,_function]}),common$1=common$6,YAMLException$1=exception,Mark=mark,DEFAULT_SAFE_SCHEMA$1=default_safe,DEFAULT_FULL_SCHEMA$1=default_full,_hasOwnProperty$1=Object.prototype.hasOwnProperty,CONTEXT_FLOW_IN=1,CONTEXT_FLOW_OUT=2,CONTEXT_BLOCK_IN=3,CONTEXT_BLOCK_OUT=4,CHOMPING_CLIP=1,CHOMPING_STRIP=2,CHOMPING_KEEP=3,PATTERN_NON_PRINTABLE=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,PATTERN_NON_ASCII_LINE_BREAKS=/[\x85\u2028\u2029]/,PATTERN_FLOW_INDICATORS=/[,\[\]\{\}]/,PATTERN_TAG_HANDLE=/^(?:!|!!|![a-z\-]+!)$/i,PATTERN_TAG_URI=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function _class(n){return Object.prototype.toString.call(n)}function is_EOL(n){return n===10||n===13}function is_WHITE_SPACE(n){return n===9||n===32}function is_WS_OR_EOL(n){return n===9||n===32||n===10||n===13}function is_FLOW_INDICATOR(n){return n===44||n===91||n===93||n===123||n===125}function fromHexCode(n){var e;return 48<=n&&n<=57?n-48:(e=n|32,97<=e&&e<=102?e-97+10:-1)}function escapedHexLen(n){return n===120?2:n===117?4:n===85?8:0}function fromDecimalCode(n){return 48<=n&&n<=57?n-48:-1}function simpleEscapeSequence(n){return n===48?"\0":n===97?"\x07":n===98?"\b":n===116||n===9?"	":n===110?`
`:n===118?"\v":n===102?"\f":n===114?"\r":n===101?"\x1B":n===32?" ":n===34?'"':n===47?"/":n===92?"\\":n===78?"":n===95?" ":n===76?"\u2028":n===80?"\u2029":""}function charFromCodepoint(n){return n<=65535?String.fromCharCode(n):String.fromCharCode((n-65536>>10)+55296,(n-65536&1023)+56320)}function setProperty(n,e,t){e==="__proto__"?Object.defineProperty(n,e,{configurable:!0,enumerable:!0,writable:!0,value:t}):n[e]=t}var simpleEscapeCheck=new Array(256),simpleEscapeMap=new Array(256);for(var i=0;i<256;i++)simpleEscapeCheck[i]=simpleEscapeSequence(i)?1:0,simpleEscapeMap[i]=simpleEscapeSequence(i);function State$1(n,e){this.input=n,this.filename=e.filename||null,this.schema=e.schema||DEFAULT_FULL_SCHEMA$1,this.onWarning=e.onWarning||null,this.legacy=e.legacy||!1,this.json=e.json||!1,this.listener=e.listener||null,this.maxTotalMergeKeys=typeof e.maxTotalMergeKeys=="number"?e.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=n.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.totalMergeKeys=0,this.documents=[]}function generateError(n,e){return new YAMLException$1(e,new Mark(n.filename,n.input,n.position,n.line,n.position-n.lineStart))}function throwError(n,e){throw generateError(n,e)}function throwWarning(n,e){n.onWarning&&n.onWarning.call(null,generateError(n,e))}var directiveHandlers={YAML:function(e,t,r){var s,a,o;e.version!==null&&throwError(e,"duplication of %YAML directive"),r.length!==1&&throwError(e,"YAML directive accepts exactly one argument"),s=/^([0-9]+)\.([0-9]+)$/.exec(r[0]),s===null&&throwError(e,"ill-formed argument of the YAML directive"),a=parseInt(s[1],10),o=parseInt(s[2],10),a!==1&&throwError(e,"unacceptable YAML version of the document"),e.version=r[0],e.checkLineBreaks=o<2,o!==1&&o!==2&&throwWarning(e,"unsupported YAML version of the document")},TAG:function(e,t,r){var s,a;r.length!==2&&throwError(e,"TAG directive accepts exactly two arguments"),s=r[0],a=r[1],PATTERN_TAG_HANDLE.test(s)||throwError(e,"ill-formed tag handle (first argument) of the TAG directive"),_hasOwnProperty$1.call(e.tagMap,s)&&throwError(e,'there is a previously declared suffix for "'+s+'" tag handle'),PATTERN_TAG_URI.test(a)||throwError(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagMap[s]=a}};function captureSegment(n,e,t,r){var s,a,o,l;if(e<t){if(l=n.input.slice(e,t),r)for(s=0,a=l.length;s<a;s+=1)o=l.charCodeAt(s),o===9||32<=o&&o<=1114111||throwError(n,"expected valid JSON character");else PATTERN_NON_PRINTABLE.test(l)&&throwError(n,"the stream contains non-printable characters");n.result+=l}}function chargeMergeWork(n){n.totalMergeKeys+=1,n.maxTotalMergeKeys!==-1&&n.totalMergeKeys>n.maxTotalMergeKeys&&throwError(n,"merge keys exceeded maxTotalMergeKeys ("+n.maxTotalMergeKeys+")")}function mergeMappings(n,e,t,r){var s,a,o,l;for(common$1.isObject(t)||throwError(n,"cannot merge mappings; the provided source object is unacceptable"),chargeMergeWork(n),s=Object.keys(t),o=0,l=s.length;o<l;o+=1)a=s[o],chargeMergeWork(n),_hasOwnProperty$1.call(e,a)||(setProperty(e,a,t[a]),r[a]=!0)}function storeMappingPair(n,e,t,r,s,a,o,l){var c,u;if(Array.isArray(s))for(s=Array.prototype.slice.call(s),c=0,u=s.length;c<u;c+=1)Array.isArray(s[c])&&throwError(n,"nested arrays are not supported inside keys"),typeof s=="object"&&_class(s[c])==="[object Object]"&&(s[c]="[object Object]");if(typeof s=="object"&&_class(s)==="[object Object]"&&(s="[object Object]"),s=String(s),e===null&&(e={}),r==="tag:yaml.org,2002:merge")if(Array.isArray(a))for(a.length>100&&throwError(n,"abnormal merge sequence size"),c=0,u=a.length;c<u;c+=1)mergeMappings(n,e,a[c],t);else mergeMappings(n,e,a,t);else!n.json&&!_hasOwnProperty$1.call(t,s)&&_hasOwnProperty$1.call(e,s)&&(n.line=o||n.line,n.position=l||n.position,throwError(n,"duplicated mapping key")),setProperty(e,s,a),delete t[s];return e}function readLineBreak(n){var e;e=n.input.charCodeAt(n.position),e===10?n.position++:e===13?(n.position++,n.input.charCodeAt(n.position)===10&&n.position++):throwError(n,"a line break is expected"),n.line+=1,n.lineStart=n.position}function skipSeparationSpace(n,e,t){for(var r=0,s=n.input.charCodeAt(n.position);s!==0;){for(;is_WHITE_SPACE(s);)s=n.input.charCodeAt(++n.position);if(e&&s===35)do s=n.input.charCodeAt(++n.position);while(s!==10&&s!==13&&s!==0);if(is_EOL(s))for(readLineBreak(n),s=n.input.charCodeAt(n.position),r++,n.lineIndent=0;s===32;)n.lineIndent++,s=n.input.charCodeAt(++n.position);else break}return t!==-1&&r!==0&&n.lineIndent<t&&throwWarning(n,"deficient indentation"),r}function testDocumentSeparator(n){var e=n.position,t;return t=n.input.charCodeAt(e),!!((t===45||t===46)&&t===n.input.charCodeAt(e+1)&&t===n.input.charCodeAt(e+2)&&(e+=3,t=n.input.charCodeAt(e),t===0||is_WS_OR_EOL(t)))}function writeFoldedLines(n,e){e===1?n.result+=" ":e>1&&(n.result+=common$1.repeat(`
`,e-1))}function readPlainScalar(n,e,t){var r,s,a,o,l,c,u,h,f=n.kind,p=n.result,_;if(_=n.input.charCodeAt(n.position),is_WS_OR_EOL(_)||is_FLOW_INDICATOR(_)||_===35||_===38||_===42||_===33||_===124||_===62||_===39||_===34||_===37||_===64||_===96||(_===63||_===45)&&(s=n.input.charCodeAt(n.position+1),is_WS_OR_EOL(s)||t&&is_FLOW_INDICATOR(s)))return!1;for(n.kind="scalar",n.result="",a=o=n.position,l=!1;_!==0;){if(_===58){if(s=n.input.charCodeAt(n.position+1),is_WS_OR_EOL(s)||t&&is_FLOW_INDICATOR(s))break}else if(_===35){if(r=n.input.charCodeAt(n.position-1),is_WS_OR_EOL(r))break}else{if(n.position===n.lineStart&&testDocumentSeparator(n)||t&&is_FLOW_INDICATOR(_))break;if(is_EOL(_))if(c=n.line,u=n.lineStart,h=n.lineIndent,skipSeparationSpace(n,!1,-1),n.lineIndent>=e){l=!0,_=n.input.charCodeAt(n.position);continue}else{n.position=o,n.line=c,n.lineStart=u,n.lineIndent=h;break}}l&&(captureSegment(n,a,o,!1),writeFoldedLines(n,n.line-c),a=o=n.position,l=!1),is_WHITE_SPACE(_)||(o=n.position+1),_=n.input.charCodeAt(++n.position)}return captureSegment(n,a,o,!1),n.result?!0:(n.kind=f,n.result=p,!1)}function readSingleQuotedScalar(n,e){var t,r,s;if(t=n.input.charCodeAt(n.position),t!==39)return!1;for(n.kind="scalar",n.result="",n.position++,r=s=n.position;(t=n.input.charCodeAt(n.position))!==0;)if(t===39)if(captureSegment(n,r,n.position,!0),t=n.input.charCodeAt(++n.position),t===39)r=n.position,n.position++,s=n.position;else return!0;else is_EOL(t)?(captureSegment(n,r,s,!0),writeFoldedLines(n,skipSeparationSpace(n,!1,e)),r=s=n.position):n.position===n.lineStart&&testDocumentSeparator(n)?throwError(n,"unexpected end of the document within a single quoted scalar"):(n.position++,s=n.position);throwError(n,"unexpected end of the stream within a single quoted scalar")}function readDoubleQuotedScalar(n,e){var t,r,s,a,o,l;if(l=n.input.charCodeAt(n.position),l!==34)return!1;for(n.kind="scalar",n.result="",n.position++,t=r=n.position;(l=n.input.charCodeAt(n.position))!==0;){if(l===34)return captureSegment(n,t,n.position,!0),n.position++,!0;if(l===92){if(captureSegment(n,t,n.position,!0),l=n.input.charCodeAt(++n.position),is_EOL(l))skipSeparationSpace(n,!1,e);else if(l<256&&simpleEscapeCheck[l])n.result+=simpleEscapeMap[l],n.position++;else if((o=escapedHexLen(l))>0){for(s=o,a=0;s>0;s--)l=n.input.charCodeAt(++n.position),(o=fromHexCode(l))>=0?a=(a<<4)+o:throwError(n,"expected hexadecimal character");n.result+=charFromCodepoint(a),n.position++}else throwError(n,"unknown escape sequence");t=r=n.position}else is_EOL(l)?(captureSegment(n,t,r,!0),writeFoldedLines(n,skipSeparationSpace(n,!1,e)),t=r=n.position):n.position===n.lineStart&&testDocumentSeparator(n)?throwError(n,"unexpected end of the document within a double quoted scalar"):(n.position++,r=n.position)}throwError(n,"unexpected end of the stream within a double quoted scalar")}function readFlowCollection(n,e){var t=!0,r,s=n.tag,a,o=n.anchor,l,c,u,h,f,p={},_,x,g,d;if(d=n.input.charCodeAt(n.position),d===91)c=93,f=!1,a=[];else if(d===123)c=125,f=!0,a={};else return!1;for(n.anchor!==null&&(n.anchorMap[n.anchor]=a),d=n.input.charCodeAt(++n.position);d!==0;){if(skipSeparationSpace(n,!0,e),d=n.input.charCodeAt(n.position),d===c)return n.position++,n.tag=s,n.anchor=o,n.kind=f?"mapping":"sequence",n.result=a,!0;t||throwError(n,"missed comma between flow collection entries"),x=_=g=null,u=h=!1,d===63&&(l=n.input.charCodeAt(n.position+1),is_WS_OR_EOL(l)&&(u=h=!0,n.position++,skipSeparationSpace(n,!0,e))),r=n.line,composeNode(n,e,CONTEXT_FLOW_IN,!1,!0),x=n.tag,_=n.result,skipSeparationSpace(n,!0,e),d=n.input.charCodeAt(n.position),(h||n.line===r)&&d===58&&(u=!0,d=n.input.charCodeAt(++n.position),skipSeparationSpace(n,!0,e),composeNode(n,e,CONTEXT_FLOW_IN,!1,!0),g=n.result),f?storeMappingPair(n,a,p,x,_,g):u?a.push(storeMappingPair(n,null,p,x,_,g)):a.push(_),skipSeparationSpace(n,!0,e),d=n.input.charCodeAt(n.position),d===44?(t=!0,d=n.input.charCodeAt(++n.position)):t=!1}throwError(n,"unexpected end of the stream within a flow collection")}function readBlockScalar(n,e){var t,r,s=CHOMPING_CLIP,a=!1,o=!1,l=e,c=0,u=!1,h,f;if(f=n.input.charCodeAt(n.position),f===124)r=!1;else if(f===62)r=!0;else return!1;for(n.kind="scalar",n.result="";f!==0;)if(f=n.input.charCodeAt(++n.position),f===43||f===45)CHOMPING_CLIP===s?s=f===43?CHOMPING_KEEP:CHOMPING_STRIP:throwError(n,"repeat of a chomping mode identifier");else if((h=fromDecimalCode(f))>=0)h===0?throwError(n,"bad explicit indentation width of a block scalar; it cannot be less than one"):o?throwError(n,"repeat of an indentation width identifier"):(l=e+h-1,o=!0);else break;if(is_WHITE_SPACE(f)){do f=n.input.charCodeAt(++n.position);while(is_WHITE_SPACE(f));if(f===35)do f=n.input.charCodeAt(++n.position);while(!is_EOL(f)&&f!==0)}for(;f!==0;){for(readLineBreak(n),n.lineIndent=0,f=n.input.charCodeAt(n.position);(!o||n.lineIndent<l)&&f===32;)n.lineIndent++,f=n.input.charCodeAt(++n.position);if(!o&&n.lineIndent>l&&(l=n.lineIndent),is_EOL(f)){c++;continue}if(n.lineIndent<l){s===CHOMPING_KEEP?n.result+=common$1.repeat(`
`,a?1+c:c):s===CHOMPING_CLIP&&a&&(n.result+=`
`);break}for(r?is_WHITE_SPACE(f)?(u=!0,n.result+=common$1.repeat(`
`,a?1+c:c)):u?(u=!1,n.result+=common$1.repeat(`
`,c+1)):c===0?a&&(n.result+=" "):n.result+=common$1.repeat(`
`,c):n.result+=common$1.repeat(`
`,a?1+c:c),a=!0,o=!0,c=0,t=n.position;!is_EOL(f)&&f!==0;)f=n.input.charCodeAt(++n.position);captureSegment(n,t,n.position,!1)}return!0}function readBlockSequence(n,e){var t,r=n.tag,s=n.anchor,a=[],o,l=!1,c;for(n.anchor!==null&&(n.anchorMap[n.anchor]=a),c=n.input.charCodeAt(n.position);c!==0&&!(c!==45||(o=n.input.charCodeAt(n.position+1),!is_WS_OR_EOL(o)));){if(l=!0,n.position++,skipSeparationSpace(n,!0,-1)&&n.lineIndent<=e){a.push(null),c=n.input.charCodeAt(n.position);continue}if(t=n.line,composeNode(n,e,CONTEXT_BLOCK_IN,!1,!0),a.push(n.result),skipSeparationSpace(n,!0,-1),c=n.input.charCodeAt(n.position),(n.line===t||n.lineIndent>e)&&c!==0)throwError(n,"bad indentation of a sequence entry");else if(n.lineIndent<e)break}return l?(n.tag=r,n.anchor=s,n.kind="sequence",n.result=a,!0):!1}function readBlockMapping(n,e,t){var r,s,a,o,l=n.tag,c=n.anchor,u={},h={},f=null,p=null,_=null,x=!1,g=!1,d;for(n.anchor!==null&&(n.anchorMap[n.anchor]=u),d=n.input.charCodeAt(n.position);d!==0;){if(r=n.input.charCodeAt(n.position+1),a=n.line,o=n.position,(d===63||d===58)&&is_WS_OR_EOL(r))d===63?(x&&(storeMappingPair(n,u,h,f,p,null),f=p=_=null),g=!0,x=!0,s=!0):x?(x=!1,s=!0):throwError(n,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),n.position+=1,d=r;else if(composeNode(n,t,CONTEXT_FLOW_OUT,!1,!0))if(n.line===a){for(d=n.input.charCodeAt(n.position);is_WHITE_SPACE(d);)d=n.input.charCodeAt(++n.position);if(d===58)d=n.input.charCodeAt(++n.position),is_WS_OR_EOL(d)||throwError(n,"a whitespace character is expected after the key-value separator within a block mapping"),x&&(storeMappingPair(n,u,h,f,p,null),f=p=_=null),g=!0,x=!1,s=!1,f=n.tag,p=n.result;else if(g)throwError(n,"can not read an implicit mapping pair; a colon is missed");else return n.tag=l,n.anchor=c,!0}else if(g)throwError(n,"can not read a block mapping entry; a multiline key may not be an implicit key");else return n.tag=l,n.anchor=c,!0;else break;if((n.line===a||n.lineIndent>e)&&(composeNode(n,e,CONTEXT_BLOCK_OUT,!0,s)&&(x?p=n.result:_=n.result),x||(storeMappingPair(n,u,h,f,p,_,a,o),f=p=_=null),skipSeparationSpace(n,!0,-1),d=n.input.charCodeAt(n.position)),n.lineIndent>e&&d!==0)throwError(n,"bad indentation of a mapping entry");else if(n.lineIndent<e)break}return x&&storeMappingPair(n,u,h,f,p,null),g&&(n.tag=l,n.anchor=c,n.kind="mapping",n.result=u),g}function readTagProperty(n){var e,t=!1,r=!1,s,a,o;if(o=n.input.charCodeAt(n.position),o!==33)return!1;if(n.tag!==null&&throwError(n,"duplication of a tag property"),o=n.input.charCodeAt(++n.position),o===60?(t=!0,o=n.input.charCodeAt(++n.position)):o===33?(r=!0,s="!!",o=n.input.charCodeAt(++n.position)):s="!",e=n.position,t){do o=n.input.charCodeAt(++n.position);while(o!==0&&o!==62);n.position<n.length?(a=n.input.slice(e,n.position),o=n.input.charCodeAt(++n.position)):throwError(n,"unexpected end of the stream within a verbatim tag")}else{for(;o!==0&&!is_WS_OR_EOL(o);)o===33&&(r?throwError(n,"tag suffix cannot contain exclamation marks"):(s=n.input.slice(e-1,n.position+1),PATTERN_TAG_HANDLE.test(s)||throwError(n,"named tag handle cannot contain such characters"),r=!0,e=n.position+1)),o=n.input.charCodeAt(++n.position);a=n.input.slice(e,n.position),PATTERN_FLOW_INDICATORS.test(a)&&throwError(n,"tag suffix cannot contain flow indicator characters")}return a&&!PATTERN_TAG_URI.test(a)&&throwError(n,"tag name cannot contain such characters: "+a),t?n.tag=a:_hasOwnProperty$1.call(n.tagMap,s)?n.tag=n.tagMap[s]+a:s==="!"?n.tag="!"+a:s==="!!"?n.tag="tag:yaml.org,2002:"+a:throwError(n,'undeclared tag handle "'+s+'"'),!0}function readAnchorProperty(n){var e,t;if(t=n.input.charCodeAt(n.position),t!==38)return!1;for(n.anchor!==null&&throwError(n,"duplication of an anchor property"),t=n.input.charCodeAt(++n.position),e=n.position;t!==0&&!is_WS_OR_EOL(t)&&!is_FLOW_INDICATOR(t);)t=n.input.charCodeAt(++n.position);return n.position===e&&throwError(n,"name of an anchor node must contain at least one character"),n.anchor=n.input.slice(e,n.position),!0}function readAlias(n){var e,t,r;if(r=n.input.charCodeAt(n.position),r!==42)return!1;for(r=n.input.charCodeAt(++n.position),e=n.position;r!==0&&!is_WS_OR_EOL(r)&&!is_FLOW_INDICATOR(r);)r=n.input.charCodeAt(++n.position);return n.position===e&&throwError(n,"name of an alias node must contain at least one character"),t=n.input.slice(e,n.position),_hasOwnProperty$1.call(n.anchorMap,t)||throwError(n,'unidentified alias "'+t+'"'),n.result=n.anchorMap[t],skipSeparationSpace(n,!0,-1),!0}function composeNode(n,e,t,r,s){var a,o,l,c=1,u=!1,h=!1,f,p,_,x,g;if(n.listener!==null&&n.listener("open",n),n.tag=null,n.anchor=null,n.kind=null,n.result=null,a=o=l=CONTEXT_BLOCK_OUT===t||CONTEXT_BLOCK_IN===t,r&&skipSeparationSpace(n,!0,-1)&&(u=!0,n.lineIndent>e?c=1:n.lineIndent===e?c=0:n.lineIndent<e&&(c=-1)),c===1)for(;readTagProperty(n)||readAnchorProperty(n);)skipSeparationSpace(n,!0,-1)?(u=!0,l=a,n.lineIndent>e?c=1:n.lineIndent===e?c=0:n.lineIndent<e&&(c=-1)):l=!1;if(l&&(l=u||s),(c===1||CONTEXT_BLOCK_OUT===t)&&(CONTEXT_FLOW_IN===t||CONTEXT_FLOW_OUT===t?x=e:x=e+1,g=n.position-n.lineStart,c===1?l&&(readBlockSequence(n,g)||readBlockMapping(n,g,x))||readFlowCollection(n,x)?h=!0:(o&&readBlockScalar(n,x)||readSingleQuotedScalar(n,x)||readDoubleQuotedScalar(n,x)?h=!0:readAlias(n)?(h=!0,(n.tag!==null||n.anchor!==null)&&throwError(n,"alias node should not have any properties")):readPlainScalar(n,x,CONTEXT_FLOW_IN===t)&&(h=!0,n.tag===null&&(n.tag="?")),n.anchor!==null&&(n.anchorMap[n.anchor]=n.result)):c===0&&(h=l&&readBlockSequence(n,g))),n.tag!==null&&n.tag!=="!")if(n.tag==="?"){for(n.result!==null&&n.kind!=="scalar"&&throwError(n,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+n.kind+'"'),f=0,p=n.implicitTypes.length;f<p;f+=1)if(_=n.implicitTypes[f],_.resolve(n.result)){n.result=_.construct(n.result),n.tag=_.tag,n.anchor!==null&&(n.anchorMap[n.anchor]=n.result);break}}else _hasOwnProperty$1.call(n.typeMap[n.kind||"fallback"],n.tag)?(_=n.typeMap[n.kind||"fallback"][n.tag],n.result!==null&&_.kind!==n.kind&&throwError(n,"unacceptable node kind for !<"+n.tag+'> tag; it should be "'+_.kind+'", not "'+n.kind+'"'),_.resolve(n.result)?(n.result=_.construct(n.result),n.anchor!==null&&(n.anchorMap[n.anchor]=n.result)):throwError(n,"cannot resolve a node with !<"+n.tag+"> explicit tag")):throwError(n,"unknown tag !<"+n.tag+">");return n.listener!==null&&n.listener("close",n),n.tag!==null||n.anchor!==null||h}function readDocument(n){var e=n.position,t,r,s,a=!1,o;for(n.version=null,n.checkLineBreaks=n.legacy,n.tagMap={},n.anchorMap={};(o=n.input.charCodeAt(n.position))!==0&&(skipSeparationSpace(n,!0,-1),o=n.input.charCodeAt(n.position),!(n.lineIndent>0||o!==37));){for(a=!0,o=n.input.charCodeAt(++n.position),t=n.position;o!==0&&!is_WS_OR_EOL(o);)o=n.input.charCodeAt(++n.position);for(r=n.input.slice(t,n.position),s=[],r.length<1&&throwError(n,"directive name must not be less than one character in length");o!==0;){for(;is_WHITE_SPACE(o);)o=n.input.charCodeAt(++n.position);if(o===35){do o=n.input.charCodeAt(++n.position);while(o!==0&&!is_EOL(o));break}if(is_EOL(o))break;for(t=n.position;o!==0&&!is_WS_OR_EOL(o);)o=n.input.charCodeAt(++n.position);s.push(n.input.slice(t,n.position))}o!==0&&readLineBreak(n),_hasOwnProperty$1.call(directiveHandlers,r)?directiveHandlers[r](n,r,s):throwWarning(n,'unknown document directive "'+r+'"')}if(skipSeparationSpace(n,!0,-1),n.lineIndent===0&&n.input.charCodeAt(n.position)===45&&n.input.charCodeAt(n.position+1)===45&&n.input.charCodeAt(n.position+2)===45?(n.position+=3,skipSeparationSpace(n,!0,-1)):a&&throwError(n,"directives end mark is expected"),composeNode(n,n.lineIndent-1,CONTEXT_BLOCK_OUT,!1,!0),skipSeparationSpace(n,!0,-1),n.checkLineBreaks&&PATTERN_NON_ASCII_LINE_BREAKS.test(n.input.slice(e,n.position))&&throwWarning(n,"non-ASCII line breaks are interpreted as content"),n.documents.push(n.result),n.position===n.lineStart&&testDocumentSeparator(n)){n.input.charCodeAt(n.position)===46&&(n.position+=3,skipSeparationSpace(n,!0,-1));return}if(n.position<n.length-1)throwError(n,"end of the stream or a document separator is expected");else return}function loadDocuments(n,e){n=String(n),e=e||{},n.length!==0&&(n.charCodeAt(n.length-1)!==10&&n.charCodeAt(n.length-1)!==13&&(n+=`
`),n.charCodeAt(0)===65279&&(n=n.slice(1)));var t=new State$1(n,e),r=n.indexOf("\0");for(r!==-1&&(t.position=r,throwError(t,"null byte is not allowed in input")),t.input+="\0";t.input.charCodeAt(t.position)===32;)t.lineIndent+=1,t.position+=1;for(;t.position<t.length-1;)readDocument(t);return t.documents}function loadAll(n,e,t){e!==null&&typeof e=="object"&&typeof t>"u"&&(t=e,e=null);var r=loadDocuments(n,t);if(typeof e!="function")return r;for(var s=0,a=r.length;s<a;s+=1)e(r[s])}function load(n,e){var t=loadDocuments(n,e);if(t.length!==0){if(t.length===1)return t[0];throw new YAMLException$1("expected a single document in the stream, but found more")}}function safeLoadAll(n,e,t){return typeof e=="object"&&e!==null&&typeof t>"u"&&(t=e,e=null),loadAll(n,e,common$1.extend({schema:DEFAULT_SAFE_SCHEMA$1},t))}function safeLoad(n,e){return load(n,common$1.extend({schema:DEFAULT_SAFE_SCHEMA$1},e))}loader$1.loadAll=loadAll;loader$1.load=load;loader$1.safeLoadAll=safeLoadAll;loader$1.safeLoad=safeLoad;var dumper$1={},common=common$6,YAMLException=exception,DEFAULT_FULL_SCHEMA=default_full,DEFAULT_SAFE_SCHEMA=default_safe,_toString=Object.prototype.toString,_hasOwnProperty=Object.prototype.hasOwnProperty,CHAR_TAB=9,CHAR_LINE_FEED=10,CHAR_CARRIAGE_RETURN=13,CHAR_SPACE=32,CHAR_EXCLAMATION=33,CHAR_DOUBLE_QUOTE=34,CHAR_SHARP=35,CHAR_PERCENT=37,CHAR_AMPERSAND=38,CHAR_SINGLE_QUOTE=39,CHAR_ASTERISK=42,CHAR_COMMA=44,CHAR_MINUS=45,CHAR_COLON=58,CHAR_EQUALS=61,CHAR_GREATER_THAN=62,CHAR_QUESTION=63,CHAR_COMMERCIAL_AT=64,CHAR_LEFT_SQUARE_BRACKET=91,CHAR_RIGHT_SQUARE_BRACKET=93,CHAR_GRAVE_ACCENT=96,CHAR_LEFT_CURLY_BRACKET=123,CHAR_VERTICAL_LINE=124,CHAR_RIGHT_CURLY_BRACKET=125,ESCAPE_SEQUENCES={};ESCAPE_SEQUENCES[0]="\\0";ESCAPE_SEQUENCES[7]="\\a";ESCAPE_SEQUENCES[8]="\\b";ESCAPE_SEQUENCES[9]="\\t";ESCAPE_SEQUENCES[10]="\\n";ESCAPE_SEQUENCES[11]="\\v";ESCAPE_SEQUENCES[12]="\\f";ESCAPE_SEQUENCES[13]="\\r";ESCAPE_SEQUENCES[27]="\\e";ESCAPE_SEQUENCES[34]='\\"';ESCAPE_SEQUENCES[92]="\\\\";ESCAPE_SEQUENCES[133]="\\N";ESCAPE_SEQUENCES[160]="\\_";ESCAPE_SEQUENCES[8232]="\\L";ESCAPE_SEQUENCES[8233]="\\P";var DEPRECATED_BOOLEANS_SYNTAX=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"];function compileStyleMap(n,e){var t,r,s,a,o,l,c;if(e===null)return{};for(t={},r=Object.keys(e),s=0,a=r.length;s<a;s+=1)o=r[s],l=String(e[o]),o.slice(0,2)==="!!"&&(o="tag:yaml.org,2002:"+o.slice(2)),c=n.compiledTypeMap.fallback[o],c&&_hasOwnProperty.call(c.styleAliases,l)&&(l=c.styleAliases[l]),t[o]=l;return t}function encodeHex(n){var e,t,r;if(e=n.toString(16).toUpperCase(),n<=255)t="x",r=2;else if(n<=65535)t="u",r=4;else if(n<=4294967295)t="U",r=8;else throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+t+common.repeat("0",r-e.length)+e}function State(n){this.schema=n.schema||DEFAULT_FULL_SCHEMA,this.indent=Math.max(1,n.indent||2),this.noArrayIndent=n.noArrayIndent||!1,this.skipInvalid=n.skipInvalid||!1,this.flowLevel=common.isNothing(n.flowLevel)?-1:n.flowLevel,this.styleMap=compileStyleMap(this.schema,n.styles||null),this.sortKeys=n.sortKeys||!1,this.lineWidth=n.lineWidth||80,this.noRefs=n.noRefs||!1,this.noCompatMode=n.noCompatMode||!1,this.condenseFlow=n.condenseFlow||!1,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function indentString(n,e){for(var t=common.repeat(" ",e),r=0,s=-1,a="",o,l=n.length;r<l;)s=n.indexOf(`
`,r),s===-1?(o=n.slice(r),r=l):(o=n.slice(r,s+1),r=s+1),o.length&&o!==`
`&&(a+=t),a+=o;return a}function generateNextLine(n,e){return`
`+common.repeat(" ",n.indent*e)}function testImplicitResolving(n,e){var t,r,s;for(t=0,r=n.implicitTypes.length;t<r;t+=1)if(s=n.implicitTypes[t],s.resolve(e))return!0;return!1}function isWhitespace(n){return n===CHAR_SPACE||n===CHAR_TAB}function isPrintable(n){return 32<=n&&n<=126||161<=n&&n<=55295&&n!==8232&&n!==8233||57344<=n&&n<=65533&&n!==65279||65536<=n&&n<=1114111}function isNsChar(n){return isPrintable(n)&&!isWhitespace(n)&&n!==65279&&n!==CHAR_CARRIAGE_RETURN&&n!==CHAR_LINE_FEED}function isPlainSafe(n,e){return isPrintable(n)&&n!==65279&&n!==CHAR_COMMA&&n!==CHAR_LEFT_SQUARE_BRACKET&&n!==CHAR_RIGHT_SQUARE_BRACKET&&n!==CHAR_LEFT_CURLY_BRACKET&&n!==CHAR_RIGHT_CURLY_BRACKET&&n!==CHAR_COLON&&(n!==CHAR_SHARP||e&&isNsChar(e))}function isPlainSafeFirst(n){return isPrintable(n)&&n!==65279&&!isWhitespace(n)&&n!==CHAR_MINUS&&n!==CHAR_QUESTION&&n!==CHAR_COLON&&n!==CHAR_COMMA&&n!==CHAR_LEFT_SQUARE_BRACKET&&n!==CHAR_RIGHT_SQUARE_BRACKET&&n!==CHAR_LEFT_CURLY_BRACKET&&n!==CHAR_RIGHT_CURLY_BRACKET&&n!==CHAR_SHARP&&n!==CHAR_AMPERSAND&&n!==CHAR_ASTERISK&&n!==CHAR_EXCLAMATION&&n!==CHAR_VERTICAL_LINE&&n!==CHAR_EQUALS&&n!==CHAR_GREATER_THAN&&n!==CHAR_SINGLE_QUOTE&&n!==CHAR_DOUBLE_QUOTE&&n!==CHAR_PERCENT&&n!==CHAR_COMMERCIAL_AT&&n!==CHAR_GRAVE_ACCENT}function needIndentIndicator(n){var e=/^\n* /;return e.test(n)}var STYLE_PLAIN=1,STYLE_SINGLE=2,STYLE_LITERAL=3,STYLE_FOLDED=4,STYLE_DOUBLE=5;function chooseScalarStyle(n,e,t,r,s){var a,o,l,c=!1,u=!1,h=r!==-1,f=-1,p=isPlainSafeFirst(n.charCodeAt(0))&&!isWhitespace(n.charCodeAt(n.length-1));if(e)for(a=0;a<n.length;a++){if(o=n.charCodeAt(a),!isPrintable(o))return STYLE_DOUBLE;l=a>0?n.charCodeAt(a-1):null,p=p&&isPlainSafe(o,l)}else{for(a=0;a<n.length;a++){if(o=n.charCodeAt(a),o===CHAR_LINE_FEED)c=!0,h&&(u=u||a-f-1>r&&n[f+1]!==" ",f=a);else if(!isPrintable(o))return STYLE_DOUBLE;l=a>0?n.charCodeAt(a-1):null,p=p&&isPlainSafe(o,l)}u=u||h&&a-f-1>r&&n[f+1]!==" "}return!c&&!u?p&&!s(n)?STYLE_PLAIN:STYLE_SINGLE:t>9&&needIndentIndicator(n)?STYLE_DOUBLE:u?STYLE_FOLDED:STYLE_LITERAL}function writeScalar(n,e,t,r){n.dump=function(){if(e.length===0)return"''";if(!n.noCompatMode&&DEPRECATED_BOOLEANS_SYNTAX.indexOf(e)!==-1)return"'"+e+"'";var s=n.indent*Math.max(1,t),a=n.lineWidth===-1?-1:Math.max(Math.min(n.lineWidth,40),n.lineWidth-s),o=r||n.flowLevel>-1&&t>=n.flowLevel;function l(c){return testImplicitResolving(n,c)}switch(chooseScalarStyle(e,o,n.indent,a,l)){case STYLE_PLAIN:return e;case STYLE_SINGLE:return"'"+e.replace(/'/g,"''")+"'";case STYLE_LITERAL:return"|"+blockHeader(e,n.indent)+dropEndingNewline(indentString(e,s));case STYLE_FOLDED:return">"+blockHeader(e,n.indent)+dropEndingNewline(indentString(foldString(e,a),s));case STYLE_DOUBLE:return'"'+escapeString(e)+'"';default:throw new YAMLException("impossible error: invalid scalar style")}}()}function blockHeader(n,e){var t=needIndentIndicator(n)?String(e):"",r=n[n.length-1]===`
`,s=r&&(n[n.length-2]===`
`||n===`
`),a=s?"+":r?"":"-";return t+a+`
`}function dropEndingNewline(n){return n[n.length-1]===`
`?n.slice(0,-1):n}function foldString(n,e){for(var t=/(\n+)([^\n]*)/g,r=function(){var u=n.indexOf(`
`);return u=u!==-1?u:n.length,t.lastIndex=u,foldLine(n.slice(0,u),e)}(),s=n[0]===`
`||n[0]===" ",a,o;o=t.exec(n);){var l=o[1],c=o[2];a=c[0]===" ",r+=l+(!s&&!a&&c!==""?`
`:"")+foldLine(c,e),s=a}return r}function foldLine(n,e){if(n===""||n[0]===" ")return n;for(var t=/ [^ ]/g,r,s=0,a,o=0,l=0,c="";r=t.exec(n);)l=r.index,l-s>e&&(a=o>s?o:l,c+=`
`+n.slice(s,a),s=a+1),o=l;return c+=`
`,n.length-s>e&&o>s?c+=n.slice(s,o)+`
`+n.slice(o+1):c+=n.slice(s),c.slice(1)}function escapeString(n){for(var e="",t,r,s,a=0;a<n.length;a++){if(t=n.charCodeAt(a),t>=55296&&t<=56319&&(r=n.charCodeAt(a+1),r>=56320&&r<=57343)){e+=encodeHex((t-55296)*1024+r-56320+65536),a++;continue}s=ESCAPE_SEQUENCES[t],e+=!s&&isPrintable(t)?n[a]:s||encodeHex(t)}return e}function writeFlowSequence(n,e,t){var r="",s=n.tag,a,o;for(a=0,o=t.length;a<o;a+=1)writeNode(n,e,t[a],!1,!1)&&(a!==0&&(r+=","+(n.condenseFlow?"":" ")),r+=n.dump);n.tag=s,n.dump="["+r+"]"}function writeBlockSequence(n,e,t,r){var s="",a=n.tag,o,l;for(o=0,l=t.length;o<l;o+=1)writeNode(n,e+1,t[o],!0,!0)&&((!r||o!==0)&&(s+=generateNextLine(n,e)),n.dump&&CHAR_LINE_FEED===n.dump.charCodeAt(0)?s+="-":s+="- ",s+=n.dump);n.tag=a,n.dump=s||"[]"}function writeFlowMapping(n,e,t){var r="",s=n.tag,a=Object.keys(t),o,l,c,u,h;for(o=0,l=a.length;o<l;o+=1)h="",o!==0&&(h+=", "),n.condenseFlow&&(h+='"'),c=a[o],u=t[c],writeNode(n,e,c,!1,!1)&&(n.dump.length>1024&&(h+="? "),h+=n.dump+(n.condenseFlow?'"':"")+":"+(n.condenseFlow?"":" "),writeNode(n,e,u,!1,!1)&&(h+=n.dump,r+=h));n.tag=s,n.dump="{"+r+"}"}function writeBlockMapping(n,e,t,r){var s="",a=n.tag,o=Object.keys(t),l,c,u,h,f,p;if(n.sortKeys===!0)o.sort();else if(typeof n.sortKeys=="function")o.sort(n.sortKeys);else if(n.sortKeys)throw new YAMLException("sortKeys must be a boolean or a function");for(l=0,c=o.length;l<c;l+=1)p="",(!r||l!==0)&&(p+=generateNextLine(n,e)),u=o[l],h=t[u],writeNode(n,e+1,u,!0,!0,!0)&&(f=n.tag!==null&&n.tag!=="?"||n.dump&&n.dump.length>1024,f&&(n.dump&&CHAR_LINE_FEED===n.dump.charCodeAt(0)?p+="?":p+="? "),p+=n.dump,f&&(p+=generateNextLine(n,e)),writeNode(n,e+1,h,!0,f)&&(n.dump&&CHAR_LINE_FEED===n.dump.charCodeAt(0)?p+=":":p+=": ",p+=n.dump,s+=p));n.tag=a,n.dump=s||"{}"}function detectType(n,e,t){var r,s,a,o,l,c;for(s=t?n.explicitTypes:n.implicitTypes,a=0,o=s.length;a<o;a+=1)if(l=s[a],(l.instanceOf||l.predicate)&&(!l.instanceOf||typeof e=="object"&&e instanceof l.instanceOf)&&(!l.predicate||l.predicate(e))){if(n.tag=t?l.tag:"?",l.represent){if(c=n.styleMap[l.tag]||l.defaultStyle,_toString.call(l.represent)==="[object Function]")r=l.represent(e,c);else if(_hasOwnProperty.call(l.represent,c))r=l.represent[c](e,c);else throw new YAMLException("!<"+l.tag+'> tag resolver accepts not "'+c+'" style');n.dump=r}return!0}return!1}function writeNode(n,e,t,r,s,a){n.tag=null,n.dump=t,detectType(n,t,!1)||detectType(n,t,!0);var o=_toString.call(n.dump);r&&(r=n.flowLevel<0||n.flowLevel>e);var l=o==="[object Object]"||o==="[object Array]",c,u;if(l&&(c=n.duplicates.indexOf(t),u=c!==-1),(n.tag!==null&&n.tag!=="?"||u||n.indent!==2&&e>0)&&(s=!1),u&&n.usedDuplicates[c])n.dump="*ref_"+c;else{if(l&&u&&!n.usedDuplicates[c]&&(n.usedDuplicates[c]=!0),o==="[object Object]")r&&Object.keys(n.dump).length!==0?(writeBlockMapping(n,e,n.dump,s),u&&(n.dump="&ref_"+c+n.dump)):(writeFlowMapping(n,e,n.dump),u&&(n.dump="&ref_"+c+" "+n.dump));else if(o==="[object Array]"){var h=n.noArrayIndent&&e>0?e-1:e;r&&n.dump.length!==0?(writeBlockSequence(n,h,n.dump,s),u&&(n.dump="&ref_"+c+n.dump)):(writeFlowSequence(n,h,n.dump),u&&(n.dump="&ref_"+c+" "+n.dump))}else if(o==="[object String]")n.tag!=="?"&&writeScalar(n,n.dump,e,a);else{if(n.skipInvalid)return!1;throw new YAMLException("unacceptable kind of an object to dump "+o)}n.tag!==null&&n.tag!=="?"&&(n.dump="!<"+n.tag+"> "+n.dump)}return!0}function getDuplicateReferences(n,e){var t=[],r=[],s,a;for(inspectNode(n,t,r),s=0,a=r.length;s<a;s+=1)e.duplicates.push(t[r[s]]);e.usedDuplicates=new Array(a)}function inspectNode(n,e,t){var r,s,a;if(n!==null&&typeof n=="object")if(s=e.indexOf(n),s!==-1)t.indexOf(s)===-1&&t.push(s);else if(e.push(n),Array.isArray(n))for(s=0,a=n.length;s<a;s+=1)inspectNode(n[s],e,t);else for(r=Object.keys(n),s=0,a=r.length;s<a;s+=1)inspectNode(n[r[s]],e,t)}function dump(n,e){e=e||{};var t=new State(e);return t.noRefs||getDuplicateReferences(n,t),writeNode(t,0,n,!0,!0)?t.dump+`
`:""}function safeDump(n,e){return dump(n,common.extend({schema:DEFAULT_SAFE_SCHEMA},e))}dumper$1.dump=dump;dumper$1.safeDump=safeDump;var loader=loader$1,dumper=dumper$1;function deprecated(n){return function(){throw new Error("Function "+n+" is deprecated and cannot be used.")}}jsYaml$1.Type=type;jsYaml$1.Schema=schema;jsYaml$1.FAILSAFE_SCHEMA=failsafe;jsYaml$1.JSON_SCHEMA=json;jsYaml$1.CORE_SCHEMA=core;jsYaml$1.DEFAULT_SAFE_SCHEMA=default_safe;jsYaml$1.DEFAULT_FULL_SCHEMA=default_full;jsYaml$1.load=loader.load;jsYaml$1.loadAll=loader.loadAll;jsYaml$1.safeLoad=loader.safeLoad;jsYaml$1.safeLoadAll=loader.safeLoadAll;jsYaml$1.dump=dumper.dump;jsYaml$1.safeDump=dumper.safeDump;jsYaml$1.YAMLException=exception;jsYaml$1.MINIMAL_SCHEMA=failsafe;jsYaml$1.SAFE_SCHEMA=default_safe;jsYaml$1.DEFAULT_SCHEMA=default_full;jsYaml$1.scan=deprecated("scan");jsYaml$1.parse=deprecated("parse");jsYaml$1.compose=deprecated("compose");jsYaml$1.addConstructor=deprecated("addConstructor");var yaml=jsYaml$1,jsYaml=yaml;(function(module,exports){const yaml=jsYaml,engines=module.exports;engines.yaml={parse:yaml.safeLoad.bind(yaml),stringify:yaml.safeDump.bind(yaml)},engines.json={parse:JSON.parse.bind(JSON),stringify:function(n,e){const t=Object.assign({replacer:null,space:2},e);return JSON.stringify(n,t.replacer,t.space)}},engines.javascript={parse:function parse(str,options,wrap){try{return wrap!==!1&&(str=`(function() {
return `+str.trim()+`;
}());`),eval(str)||{}}catch(n){if(wrap!==!1&&/(unexpected|identifier)/i.test(n.message))return parse(str,options,!1);throw new SyntaxError(n)}},stringify:function(){throw new Error("stringifying JavaScript is not supported")}}})(engines$2);var enginesExports=engines$2.exports,utils$3={};/*!
 * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */var stripBomString=function(n){return typeof n=="string"&&n.charAt(0)==="\uFEFF"?n.slice(1):n};(function(n){const e=stripBomString,t=kindOf;n.define=function(r,s,a){Reflect.defineProperty(r,s,{enumerable:!1,configurable:!0,writable:!0,value:a})},n.isBuffer=function(r){return t(r)==="buffer"},n.isObject=function(r){return t(r)==="object"},n.toBuffer=function(r){return typeof r=="string"?Buffer.from(r):r},n.toString=function(r){if(n.isBuffer(r))return e(String(r));if(typeof r!="string")throw new TypeError("expected input to be a string or buffer");return e(r)},n.arrayify=function(r){return r?Array.isArray(r)?r:[r]:[]},n.startsWith=function(r,s,a){return typeof a!="number"&&(a=s.length),r.slice(0,a)===s}})(utils$3);const engines$1=enginesExports,utils$2=utils$3;var defaults$4=function(n){const e=Object.assign({},n);return e.delimiters=utils$2.arrayify(e.delims||e.delimiters||"---"),e.delimiters.length===1&&e.delimiters.push(e.delimiters[0]),e.language=(e.language||e.lang||"yaml").toLowerCase(),e.engines=Object.assign({},engines$1,e.parsers,e.engines),e},engine=function(n,e){let t=e.engines[n]||e.engines[aliase(n)];if(typeof t>"u")throw new Error('gray-matter engine "'+n+'" is not registered');return typeof t=="function"&&(t={parse:t}),t};function aliase(n){switch(n.toLowerCase()){case"js":case"javascript":return"javascript";case"coffee":case"coffeescript":case"cson":return"coffee";case"yaml":case"yml":return"yaml";default:return n}}const typeOf$1=kindOf,getEngine$1=engine,defaults$3=defaults$4;var stringify$2=function(n,e,t){if(e==null&&t==null)switch(typeOf$1(n)){case"object":e=n.data,t={};break;case"string":return n;default:throw new TypeError("expected file to be a string or object")}const r=n.content,s=defaults$3(t);if(e==null){if(!s.data)return n;e=s.data}const a=n.language||s.language,o=getEngine$1(a,s);if(typeof o.stringify!="function")throw new TypeError('expected "'+a+'.stringify" to be a function');e=Object.assign({},n.data,e);const l=s.delimiters[0],c=s.delimiters[1],u=o.stringify(e,t).trim();let h="";return u!=="{}"&&(h=newline(l)+newline(u)+newline(c)),typeof n.excerpt=="string"&&n.excerpt!==""&&r.indexOf(n.excerpt.trim())===-1&&(h+=newline(n.excerpt)+newline(c)),h+newline(r)};function newline(n){return n.slice(-1)!==`
`?n+`
`:n}const defaults$2=defaults$4;var excerpt$1=function(n,e){const t=defaults$2(e);if(n.data==null&&(n.data={}),typeof t.excerpt=="function")return t.excerpt(n,t);const r=n.data.excerpt_separator||t.excerpt_separator;if(r==null&&(t.excerpt===!1||t.excerpt==null))return n;const s=typeof t.excerpt=="string"?t.excerpt:r||t.delimiters[0],a=n.content.indexOf(s);return a!==-1&&(n.excerpt=n.content.slice(0,a)),n};const typeOf=kindOf,stringify$1=stringify$2,utils$1=utils$3;var toFile$1=function(n){return typeOf(n)!=="object"&&(n={content:n}),typeOf(n.data)!=="object"&&(n.data={}),n.contents&&n.content==null&&(n.content=n.contents),utils$1.define(n,"orig",utils$1.toBuffer(n.content)),utils$1.define(n,"language",n.language||""),utils$1.define(n,"matter",n.matter||""),utils$1.define(n,"stringify",function(e,t){return t&&t.language&&(n.language=t.language),stringify$1(n,e,t)}),n.content=utils$1.toString(n.content),n.isEmpty=!1,n.excerpt="",n};const getEngine=engine,defaults$1=defaults$4;var parse$1=function(n,e,t){const r=defaults$1(t),s=getEngine(n,r);if(typeof s.parse!="function")throw new TypeError('expected "'+n+'.parse" to be a function');return s.parse(e,r)};const fs=require$$0,sections=sectionMatter,defaults=defaults$4,stringify=stringify$2,excerpt=excerpt$1,engines=enginesExports,toFile=toFile$1,parse=parse$1,utils=utils$3;function matter(n,e){if(n==="")return{data:{},content:n,excerpt:"",orig:n};let t=toFile(n);const r=matter.cache[t.content];if(!e){if(r)return t=Object.assign({},r),t.orig=r.orig,t;matter.cache[t.content]=t}return parseMatter(t,e)}function parseMatter(n,e){const t=defaults(e),r=t.delimiters[0],s=`
`+t.delimiters[1];let a=n.content;t.language&&(n.language=t.language);const o=r.length;if(!utils.startsWith(a,r,o))return excerpt(n,t),n;if(a.charAt(o)===r.slice(-1))return n;a=a.slice(o);const l=a.length,c=matter.language(a,t);c.name&&(n.language=c.name,a=a.slice(c.raw.length));let u=a.indexOf(s);return u===-1&&(u=l),n.matter=a.slice(0,u),n.matter.replace(/^\s*#[^\n]+/gm,"").trim()===""?(n.isEmpty=!0,n.empty=n.content,n.data={}):n.data=parse(n.language,n.matter,t),u===l?n.content="":(n.content=a.slice(u+s.length),n.content[0]==="\r"&&(n.content=n.content.slice(1)),n.content[0]===`
`&&(n.content=n.content.slice(1))),excerpt(n,t),(t.sections===!0||typeof t.section=="function")&&sections(n,t.section),n}matter.engines=engines;matter.stringify=function(n,e,t){return typeof n=="string"&&(n=matter(n,t)),stringify(n,e,t)};matter.read=function(n,e){const t=fs.readFileSync(n,"utf8"),r=matter(t,e);return r.path=n,r};matter.test=function(n,e){return utils.startsWith(n,defaults(e).delimiters[0])};matter.language=function(n,e){const r=defaults(e).delimiters[0];matter.test(n)&&(n=n.slice(r.length));const s=n.slice(0,n.search(/\r?\n/));return{raw:s,name:s?s.trim():""}};matter.cache={};matter.clearCache=function(){matter.cache={}};var grayMatter=matter;const matter$1=getDefaultExportFromCjs(grayMatter),THEME_COLORS={"Languages & Compilers":4491519,"Systems & Virtualization":16729156,"Games & 3D":4521796,Physics:16755200,"Art & Culture":16729343,"Tools & Apps":56831},THEME_POSITIONS={"Languages & Compilers":{x:-150,y:50,z:0},"Systems & Virtualization":{x:150,y:50,z:0},"Games & 3D":{x:0,y:-100,z:-100},Physics:{x:-100,y:100,z:100},"Art & Culture":{x:100,y:-50,z:100},"Tools & Apps":{x:0,y:50,z:-150}};let camera,scene,renderer,cssRenderer,composer,stars=[],currentCard=null,controls={mouseDown:!1,mouseX:0,mouseY:0,targetRotationX:0,targetRotationY:0,currentRotationX:0,currentRotationY:0,targetZoom:300,currentZoom:300};async function loadContent(){const n=["intro.md","db48x.md","xl-tao3d.md","hpcpp.md","hpvm.md","kata-containers.md","spice.md","dxo-one.md","ecutest.md","taodyne.md","alpha-waves.md","hp48-games.md","recorder.md","make-it-quick.md","emacs-aqua.md","physics-books.md","informagie.md","3divart.md"],e=[];for(const t of n)try{const s=await(await fetch(`/cv/content/${t}`)).text(),{data:a,content:o}=matter$1(s);e.push({...a,content:marked(o)})}catch(r){console.warn(`Failed to load ${t}:`,r)}return e}function initScene(){camera=new PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1e4),camera.position.z=300,scene=new Scene,scene.fog=new FogExp2(0,8e-4),renderer=new WebGLRenderer({antialias:!0,alpha:!0}),renderer.setSize(window.innerWidth,window.innerHeight),renderer.setPixelRatio(window.devicePixelRatio),document.getElementById("canvas-container").appendChild(renderer.domElement),cssRenderer=new CSS3DRenderer,cssRenderer.setSize(window.innerWidth,window.innerHeight),cssRenderer.domElement.style.position="absolute",cssRenderer.domElement.style.top="0",cssRenderer.domElement.style.pointerEvents="none",document.getElementById("ui-overlay").appendChild(cssRenderer.domElement),composer=new EffectComposer(renderer),composer.addPass(new RenderPass(scene,camera));const n=new UnrealBloomPass(new Vector2(window.innerWidth,window.innerHeight),1.5,.4,.85);composer.addPass(n),createBackgroundStars()}function createBackgroundStars(){const n=[16729156,16746496,16776960,4521796,4491519,8930559,16729343],e=new BufferGeometry,t=[],r=[];for(let o=0;o<1e3;o++){const l=(Math.random()-.5)*2e3,c=(Math.random()-.5)*2e3,u=(Math.random()-.5)*2e3;t.push(l,c,u);const h=new Color(n[o%n.length]);r.push(h.r,h.g,h.b)}e.setAttribute("position",new Float32BufferAttribute(t,3)),e.setAttribute("color",new Float32BufferAttribute(r,3));const s=new PointsMaterial({size:1.5,vertexColors:!0,transparent:!0,opacity:.4}),a=new Points(e,s);scene.add(a)}function createStars(n){n.forEach((e,t)=>{const r=e.theme||"Tools & Apps",s=THEME_COLORS[r]||16777215,o=2+(e.weight||5)/10*8,l=THEME_POSITIONS[r]||{x:0,y:0,z:0},c=40,u=new Vector3(l.x+(Math.random()-.5)*c,l.y+(Math.random()-.5)*c,l.z+(Math.random()-.5)*c),h=new Group,f=new SphereGeometry(o,16,16),p=new MeshBasicMaterial({color:s,transparent:!0,opacity:1}),_=new Mesh(f,p);h.add(_);const x=new SphereGeometry(o*1.5,16,16),g=new MeshBasicMaterial({color:s,transparent:!0,opacity:.3,side:BackSide}),d=new Mesh(x,g);h.add(d),h.position.copy(u),scene.add(h),stars.push({mesh:h,data:e,position:u,color:s,size:o,index:t})}),createConnections()}function createConnections(){stars.forEach(n=>{n.data.related&&n.data.related.forEach(e=>{const t=stars.find(r=>r.data.id===e);if(t){const r=[n.position,t.position],s=new BufferGeometry().setFromPoints(r),a=new LineBasicMaterial({color:4473924,transparent:!0,opacity:.3}),o=new Line(s,a);scene.add(o)}})})}function createCard(n){currentCard&&closeCard();const e=n.data,t=document.createElement("div");t.className="star-card";let r="";e.id==="intro"&&(r='<img src="/cv/logo.png" alt="Christophe de Dinechin" style="width: 100px; height: 100px; margin: 0 auto 20px; display: block;">');let s=`
    <button class="close-button" onclick="window.closeCard()">×</button>
    ${r}
    <h2>${e.title}</h2>
    <div class="meta">
      ${e.theme?`<span class="theme-badge">${e.theme}</span>`:""}
      ${e.years?`<span class="years">${e.years}</span>`:""}
    </div>
    <div class="content">
      ${e.content}
    </div>
  `;e.videos&&e.videos.length>0&&e.videos.forEach(l=>{s+=`
        <div class="video-container">
          <iframe 
            src="https://www.youtube.com/embed/${l}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `}),e.links&&e.links.length>0&&(s+='<div class="links">',e.links.forEach(l=>{s+=`<a href="${l.url}" target="_blank" rel="noopener" class="link-button">${l.label}</a>`}),s+="</div>"),t.innerHTML=s;const a=new CSS3DObject(t),o=new Vector3(0,0,50);a.position.copy(n.position).add(o),scene.add(a),currentCard={element:t,cssObject:a,star:n},animateCameraToStar(n),window.location.hash=e.id}function closeCard(){currentCard&&(scene.remove(currentCard.cssObject),currentCard=null,window.location.hash="")}window.closeCard=closeCard;function animateCameraToStar(n){const e=n.position.clone().add(new Vector3(0,20,80)),t=camera.position.clone(),r=1e3,s=Date.now();function a(){const o=Date.now()-s,l=Math.min(o/r,1),c=easeInOutCubic(l);camera.position.lerpVectors(t,e,c),camera.lookAt(n.position),l<1&&requestAnimationFrame(a)}a()}function easeInOutCubic(n){return n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2}function enterOverviewMode(){closeCard();const n=new Vector3(0,100,400),e=camera.position.clone(),t=1e3,r=Date.now();function s(){const a=Date.now()-r,o=Math.min(a/t,1),l=easeInOutCubic(o);camera.position.lerpVectors(e,n,l),camera.lookAt(new Vector3(0,0,0)),o<1&&requestAnimationFrame(s)}s()}function setupInteraction(){const n=document.getElementById("canvas-container"),e=new Raycaster,t=new Vector2;n.addEventListener("mousedown",r),n.addEventListener("mousemove",s),n.addEventListener("mouseup",a),n.addEventListener("touchstart",o,{passive:!1}),n.addEventListener("touchmove",l,{passive:!1}),n.addEventListener("touchend",a),n.addEventListener("wheel",c,{passive:!1}),n.addEventListener("click",u),window.addEventListener("keydown",h=>{h.key==="Escape"?closeCard():(h.key==="o"||h.key==="O")&&enterOverviewMode()});function r(h){controls.mouseDown=!0,controls.mouseX=h.clientX,controls.mouseY=h.clientY}function s(h){if(controls.mouseDown&&!currentCard){const f=h.clientX-controls.mouseX,p=h.clientY-controls.mouseY;controls.targetRotationY+=f*.005,controls.targetRotationX+=p*.005,controls.mouseX=h.clientX,controls.mouseY=h.clientY}}function a(){controls.mouseDown=!1}function o(h){h.touches.length===1&&(controls.mouseDown=!0,controls.mouseX=h.touches[0].clientX,controls.mouseY=h.touches[0].clientY)}function l(h){if(h.touches.length===1&&controls.mouseDown&&!currentCard){h.preventDefault();const f=h.touches[0].clientX-controls.mouseX,p=h.touches[0].clientY-controls.mouseY;controls.targetRotationY+=f*.005,controls.targetRotationX+=p*.005,controls.mouseX=h.touches[0].clientX,controls.mouseY=h.touches[0].clientY}}function c(h){h.preventDefault(),controls.targetZoom+=h.deltaY*.1,controls.targetZoom=Math.max(100,Math.min(controls.targetZoom,600))}function u(h){if(controls.mouseDown)return;t.x=h.clientX/window.innerWidth*2-1,t.y=-(h.clientY/window.innerHeight)*2+1,e.setFromCamera(t,camera);const f=stars.map(_=>_.mesh),p=e.intersectObjects(f,!0);if(p.length>0){const _=p[0].object.parent||p[0].object,x=stars.find(g=>g.mesh===_);x&&createCard(x)}}window.addEventListener("resize",()=>{camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight),cssRenderer.setSize(window.innerWidth,window.innerHeight),composer.setSize(window.innerWidth,window.innerHeight)})}function animate(){if(requestAnimationFrame(animate),!currentCard){controls.currentRotationX+=(controls.targetRotationX-controls.currentRotationX)*.05,controls.currentRotationY+=(controls.targetRotationY-controls.currentRotationY)*.05;const n=new Group;scene.children.forEach(e=>n.add(e.clone())),camera.position.x=Math.sin(controls.currentRotationY)*controls.currentZoom,camera.position.z=Math.cos(controls.currentRotationY)*controls.currentZoom,camera.position.y=Math.sin(controls.currentRotationX)*50}controls.currentZoom+=(controls.targetZoom-controls.currentZoom)*.05,currentCard||camera.lookAt(0,0,0),composer.render(),cssRenderer.render(scene,camera)}function generatePrintView(n){const e=document.getElementById("print-view");let t="<h1>Christophe de Dinechin</h1>";t+='<p class="subtitle">Software as a Passion</p>';const r={};n.forEach(s=>{const a=s.theme||"Other";r[a]||(r[a]=[]),r[a].push(s)}),Object.keys(r).forEach(s=>{r[s].sort((a,o)=>(o.weight||0)-(a.weight||0)),r[s]=r[s].slice(0,5)}),Object.keys(r).forEach(s=>{t+='<div class="theme-section">',t+=`<h2>${s}</h2>`,r[s].forEach(a=>{t+='<div class="project">',t+=`<h3>${a.title}</h3>`,a.years&&(t+=`<div class="years">${a.years}</div>`);const o=document.createElement("div");o.innerHTML=a.content;const l=o.querySelector("p");l&&(t+=`<p>${l.textContent.substring(0,200)}...</p>`),t+="</div>"}),t+="</div>"}),t+='<div class="qr-section">',t+='<img src="/cv/logo.png" alt="Christophe de Dinechin">',t+='<div class="qr-text">',t+="<p><strong>Christophe de Dinechin</strong></p>",t+="<p>View the interactive 3D version at:</p>",t+="<p><strong>https://c3d.github.io/cv/</strong></p>",t+="</div>",t+="</div>",e.innerHTML=t}async function init(){console.log("Initializing 3D CV..."),initScene();const n=await loadContent();if(console.log(`Loaded ${n.length} projects`),createStars(n),setupInteraction(),generatePrintView(n),document.getElementById("loading").classList.add("hidden"),window.location.hash){const e=window.location.hash.substring(1),t=stars.find(r=>r.data.id===e);t&&setTimeout(()=>createCard(t),500)}animate()}init().catch(n=>{console.error("Failed to initialize:",n),document.getElementById("loading").innerHTML="<p>Failed to load. Please refresh.</p>"});
