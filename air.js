/**
 * 
 * Copyright © 2011-2014 mitian Inc.  All rights reserved.
 */
(function( window,undefined ){
  var START_EVENT='ontouchstart' in document.documentElement?"touchstart":"mousedown", 
  MOVE_EVENT='ontouchstart' in document.documentElement?"touchmove":"mousemove",
  END_EVENT='ontouchstart' in document.documentElement?"touchend":"mouseup";
 
  var air=function( selector, context ){
     return new air.fn.init( selector, context ); 
  }
  air.version=2.0;
  air.platform=navigator.platform.toLowerCase();
  air.userAgent = window.navigator.userAgent.toLowerCase();
  
  air.fn=air.prototype ={
    init:function( selector, context ){
      if( typeof selector==="string" ){
        //构建选择器
        var airDoment=document.getElementById( selector )||document.querySelector( selector );
        if( $.utils.isArray(airDoment) ){
          airDoment=document.querySelectorAll( selector )
        }
        this.document= airDoment
      }else{
        this.document=selector
      }
    },
    E:function(){
      return this.document;
    },
    //html添加
    append:function(n){
      //添加对象
      this.document.appendChild(n);
    },
    children:function(n){
       this.document=this.document.children[n];
       return air(this.document);
    },
    prev:function(){
      return air(air.utils.prev(this.document));
    },
    next:function(){
      return air(air.utils.next(this.document));
    },
    html:function(text){
      this.document.innerHTML=text;
    },
    addHtml:function(text){
      this.document.innerHTML=this.document.innerHTML+text;
    },
    text:function(text){
      this.document.innerText=text;
    },
    remove:function(a){
      this.document.removeChild(document.querySelector(a))
    },
    href:function(a){
       this.document.href=a;
    },
    src:function(a){
       this.document.src=a;
    },
    hasChild:function(){
      //判断是否存在子节点
      return this.document.hasChildNodes();
    },
    val:function(a){
       if(a!=null){
         this.document.value=a;
         return
       }
       return this.document.value
     },
    //动画
    transition:function(transform,timing,delay,tf){
      this.document.style.webkitTransitionDelay=delay||0;
      this.document.style.webkitTransitionDuration=timing||0;
      this.document.style.webkitTransform = transform
      this.document.style.webkitTransitionTimingFunction=tf||'ease';
    },
    run:function(){
      this.document.style.webkitAnimationPlayState="running"
    },
    paused:function(){
      this.document.style.webkitAnimationPlayState="paused"
    },
    left:function(a,b,c,d){
       air(this.document).transition($.transform.tx(-a),b||0,c||0,d);
    },
    right:function(a,b,c,d){
       air(this.document).transition($.transform.tx(a),b||0,c||0,d);
    },
    down:function(a,b,c,d){
       air(this.document).transition($.transform.ty(a),b||0,c||0,d);
    },
    up:function(a,b,c,d){
       air(this.document).transition($.transform.ty(-a),b||0,c||0,d);
    },
    scale:function(a,b,c,d){
       air(this.document).transition($.transform.scale(a),b||0,c||0,d);
    },
    move:function(a,b,c,d,type){
      c=800
      if(type==1){
        var f=new Date();
        var document=this.document
        var an=function(l){
          l=l||new Date();
          var progress =  l-f;
          if (progress >= c) {
           document.style.marginTop = b + 'px';
           document.style.marginLeft = a + 'px';
            return
          }
          document.style.marginTop = b*progress/c + 'px';
          document.style.marginLeft = a*progress/c + 'px';
          timeFun(an)
        }
        timeFun(an)
         
        return;
      }
      air(this.document).transition($.transform.t(a,b),c||0,d||0);
    },
    animate:function(name, from, to, time) {
        time = time || 800; // 默认0.8秒
        var style = this.document.style,
            startTime = new Date,
            t=0;
        function go(timestamp) {
          timestamp=timestamp||new Date();
            var progress = timestamp - startTime;
            if (progress >= time) {
                style[name] = to + 'px';
                return;
            }
            t<100&&t++;
            var now = (to - from) * (t / 100);
            style[name] = now.toFixed(2) + 'px';
            timeFun(go);
        }
    
        style[name] = from + 'px';
    
        timeFun(go);
    },
    //特殊动画
    opacityTransition:function(val,timing,delay){
      this.document.style.webkitTransitionDelay=delay||0;
      this.document.style.webkitTransitionDuration=timing||0;
      this.document.style.opacity=val
    },
    //样式
    show:function(){
      this.document.style.display="block";
    },
    hide:function(){
      this.document.style.display="none";
    },
    style:function(a,b){
      if(b!=null){
        this.document.style[a]=b;
        return
      }
      return this.document.style[a];
      
    },
    cssText:function(a){
       this.document.style.cssText=a;
    },
    addClass:function(n){
      if(this.document!=null) this.document.className=this.document.className==""?n:this.document.className+" "+n;
    },
    removeClass:function(n){
      if(this.document==null) return;
      var e=this.document.className,r=[],i=0;
      if(e=="") return
      var className=e.split(" ");
      for (; className[i]; i++) {
        if(className[i]!=n)
          r.push(className[i]);
      }
      this.document.className=r.join(' ');
    },
    boxShadow:function(a,b,c,d,e){
      air(this.document).style('-webkit-box-shadow:'+' '+a+' '+b+' '+c+' '+d+' '+e)
    },
    //点击事件
    click:function(context){
      var i=0;
      if(!air.utils.isArray(this.document)){
         this.document.onclick=function(e){
            context(e);
          }
      }
      for(;this.document[i];i++){
          this.document[i].onclick=function(e){
            context(e);
          }
      }
    },
    //触摸事件
    mouse:function(a,b,c){
      $(this.document).mousedown(a);
      $(this.document).mousemove(b);
      $(this.document).mouseup(c)
    },
     mousedown:function(a){
        this.document.addEventListener(START_EVENT,function(e) {
          a(e);
        })
     },
     mousemove:function(a,isDefault){
          this.document.addEventListener(MOVE_EVENT,function(e) {
            if(!isDefault)
            e.preventDefault();
            a&&a(e);
          });
     },
     mouseup:function(a){
        this.document.addEventListener(END_EVENT,function(e) {
          a&&a(e);
        })
     },
     //表单事件
     submit:function(){
        this.document.submit();
     },
     extend:function(des,src){
      for (var index in src){
            var copy = src[index];
            if (des === copy){
                continue;//例如window.window === window，会陷入死循环，父子相互引用的问题    
            }
            if (air.utils.is(copy,'Object')){
                des[index] = arguments.callee(des[index] || {},copy);
            }else if (air.utils.is(copy,'Array')){
                des[index] = arguments.callee(des[index] || [],copy);
            }else{
                des[index] = copy;    
            }
        }
        return des;
     },
      //插件
      addVideo:function(a,js){
        var d={
          id:js&&js.id,
          w:js&&js.width,
          h:js&&js.height
        }
        var v=document.createElement("video");
        v.id=d.id||'AIR_V';
        
        v.style['width']=d.w||'300px';
        v.style['height']=d.h||'80px';
        v.controls='controls';
        var s =document.createElement("source");
        s.type="video/mp4";
        s.src=a;
        v.appendChild(s);
        this.document.appendChild(v);
        return v;
      },
      addEventListener:function(tag,fun){
        this.document.addEventListener(tag,fun)
      },
      removeEventListener:function(tag,fun){
        this.document.removeEventListener(tag)
      },
      slider:function(_p){
          var p={
  	          index:_p.index || 1,
  	          speed:_p.speed || '400ms',
  	          cir:_p.cir || null,//是否显示圆点
  	          leftBt:_p.leftBt || null,//是否开启左右滑动
  	          rightBt:_p.rightBt || null
            },offset=0,
              endPos=null,
              startPos=null,
              cir=$(p.cir) || null,
          	btL=$(p.leftBt) || null,
          	btR=$(p.rightBt) || null,
              locked=true,
              container=this.document,
              cid=container.id,
              pageListTarget=container.children[0];
          	pageTarget=pageListTarget.children;
              pageCount=pageTarget.length;
              pageWidth= pageTarget[0].offsetWidth || container.offsetWidth;
              KEYX=0.12 * pageWidth;//定义是否触发滑动的位移临界值
              //初始化
              pageListTarget.style.width=pageWidth*pageCount+'px';
              offset=(p.index-1)*pageWidth;
              $(pageListTarget).left(offset,0);
              if(p.cir){//创建圆点
              	for(var i=1;i<=pageCount;i++)cir.addHtml('<a id='+cid+'cir'+i+'></a>')
              	$(cid+'cir'+(p.index)).addClass('now');
              }
              if(p.leftBt && p.rightBt){//侦听左右切换按钮
              	btL.click(function(){if(p.index>1)prev()});
              	btR.click(function(){if(p.index<pageCount)next()});
              };
              container.addEventListener(START_EVENT,function(e){start(e)},false);
              document.addEventListener(MOVE_EVENT,function(e){move(e)},false);
              document.addEventListener(END_EVENT,function(e){end(e)},false);
              function getPoint(ev) {
                  var x = y = 0;
                  var evt = ev.touches[0];
                  x += evt.clientX;
                  y += evt.clientY;
                  return {'x' : x, 'y' : y};
              };
              function next(){//下一页
              	p.index++;
                  offset=offset+pageWidth;
                  $(pageListTarget).left(offset,p.speed);
                  if(p.leftBt && p.rightBt){
                  	if (p.index == pageCount) {
                  		btR.hide();
                  		btL.show();
                  	}else if(p.index == 2)btL.show();
                  };
                  if(p.cir){
                      $(cid+'cir'+(p.index-1)).removeClass('now');
                      $(cid+'cir'+(p.index)).addClass('now');	
                  };
              };
              function prev(){//上一页
              	 p.index--;          
                   offset=offset-pageWidth;
                   $(pageListTarget).left(offset,p.speed);
                   if(p.leftBt && p.rightBt){
                  	 if (p.index==1){
                  		 btL.hide();
                  		 btR.show();
                  	 }else if(p.index == pageCount-1)btR.show();
                   };
                   if(p.cir){
              		 $(cid+'cir'+(p.index+1)).removeClass('now');
                       $(cid+'cir'+(p.index)).addClass('now');	
              	};
              };
              function start(e){
              	startPos=getPoint(e);
              	locked=false;
              };
              function move(e){
              	endPos=getPoint(e);
              	var offx=endPos.x-startPos.x;
              	if(Math.abs(offx)>=Math.abs(endPos.y-startPos.y))e.preventDefault();
              };
              function end(e){
              	var offx=endPos.x-startPos.x;
              	if(offx<-KEYX && p.index<pageCount && locked==false)next();
              	else if(offx>KEYX && p.index>1 && locked==false)prev();
              	locked=true;
              };
        },
      slippage:function(fun,_p){
        var _boundary= this.document.children[0].children[0].offsetWidth || this.document.children[0].children[0].clientWidth
        ,_currentTarget;
        if(_p==null){
           _currentTarget=this.document.children[0].children[0];
        }else{
          _currentTarget=_p.currentTarget
          for( var a = $(_currentTarget);a.prev().document;){
            a=a.prev();
            a.style('margin-left',-_boundary+'px')
          }
        }
        p={
          singeWidth:'20px',
          document:this.document,
          boundary:_boundary,//获取实际宽度
          pageListTarget:this.document.children[0],
          pageCount:this.document.children[0].children.length,
          currentTarget:_currentTarget,
          prevTarget:null,
          nextTarget:null,
          offset:0,
          startX:0,
          isCycle:false,
          isSlippage:false
        }
        //页面滑动
        this.document.addEventListener(START_EVENT,function(e){
          p.isSlippage=true;//是否执行了点击滑动事件---针对电脑
          var clientX = e.clientX||e.changedTouches[0].clientX;
          p.startX=clientX;
          //获取前一个和后一个dom
          p.prevTarget= air.utils.prev(p.currentTarget);
          p.nextTarget=air.utils.next(p.currentTarget);
          //设置动画时间
          if(p.prevTarget) p.prevTarget.style.webkitTransitionDuration="400ms";
          p.currentTarget.style.webkitTransitionDuration="400ms";
          if(p.nextTarget)p.nextTarget.style.webkitTransitionDuration="400ms"
        });
        
        this.document.addEventListener(MOVE_EVENT,function(e){
          if (p.isSlippage) {
            e.preventDefault();
            var clientX = e.clientX || e.changedTouches[0].clientX;
            //获取偏移量
            p.offset = clientX - p.startX;
            if (p.startX != 0) {
             //执行滑动中的动画
           //  if(p.prevTarget) p.prevTarget.style.webkitTransform = "translateX(" + p.offset + "px)"
            //  p.currentTarget.style.webkitTransform = "translateX(" + p.offset + "px)";
           //  if(p.nextTarget) p.nextTarget.style.webkitTransform = "translateX(" + p.offset + "px)"
            }
          }
        });
        
        this.document.addEventListener(END_EVENT,function(e){
          var a=p.offset>0?1:-1;//获取实际滑动方向 -1向左 1向右
          if(p.offset==0) return;//如后没有滑动，结束动画
          //执行滑动后的动画
          if(p.prevTarget) p.prevTarget.style.webkitTransform = "translateX(" + a*p.boundary + "px)"
          p.currentTarget.style.webkitTransform = "translateX(" + a*p.boundary + "px)";
          if(p.nextTarget)p.nextTarget.style.webkitTransform = "translateX(" + a*p.boundary + "px)"
          
           //动画结束初始化参数初始化
            var b=true;
            if(a==-1&&p.nextTarget){
               p.currentTarget.style.marginLeft =-p.boundary+"px";
               p.currentTarget.style.webkitTransform = "";
            }else if(a==1&&p.prevTarget){
              p.prevTarget.style.marginLeft =0+"px";
              p.currentTarget.style.webkitTransform = "";
              p.prevTarget.style.webkitTransform = "";
            }else{
              p.currentTarget.style.webkitTransform = "";
              if(p.prevTarget) p.prevTarget.style.webkitTransform = "";
              b=false;
            }
          
          if (p.prevTarget) {
            p.prevTarget.style.webkitTransform = "";
          }
           if(p.nextTarget){
              p.nextTarget.style.webkitTransform = "";
           }
           
           //指针移到当前dom
          if(b) p.currentTarget= a<1? p.nextTarget:p.prevTarget;  
           p.isSlippage=false;
           p.startX=0;
           p.offset=0;
           p.document.removeEventListener(START_EVENT, this);
           p.document.removeEventListener(MOVE_EVENT, this)
           
           //butNow
           butNow(p.currentTarget);
            fun&&(fun({direct:a,obj:p.currentTarget}));
        });
        //计数
        //var page_btu=function(){
          //创建计数
          for(var i=p.pageCount;i>0;i--){
           $('.air_btu').append(document.createElement('a'));
          }
          //计数变化
            var butNow=function(n){
              var index=air.utils.findIndex(n);
              var domcument=$('.air_btu').children(index);
              domcument.addClass('now');
              domcument.prev().removeClass('now');
              domcument.next().removeClass('now');
              
            }
            butNow(p.currentTarget);
       // }
      }
  }
  air.fn.init.prototype = air.fn;
  
  
  air.ready=function( DOMContentLoaded ){
    //加载器
      document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false ); 
      window.addEventListener( "load", air.ready, false ); 
  }
  air.imgLoad=function(a,imgList){
    //div里面的
  
    //
    if(imgList!=null){
      for(var imgIndex=0;imgIndex<imgList.length;imgIndex++){
        var img = document.createElement("img");
        img.src=imgList[imgIndex];
        img.style.display="none";
        document.body.appendChild(img);
      }
    }
    var imgs =document.getElementsByTagName('img')
        ,imgsArr=[];
    for(var b=0; b<imgs.length;b++){
        if (imgs[b].complete) {
           imgsArr.push(b);
            if(imgs.length==imgsArr.length){
             a&&a()
            }
        }else{
          imgs[b].onerror= imgs[b].onload=(function(){
            imgsArr.push(b);
            if(imgs.length==imgsArr.length){
             a&&a()
            }
          }) 
        }
    }
  }
  air.script=function(url,cache,fun){
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    if(!cache){
      url+="?"+new Date().getTime();
    }
    script.setAttribute("src", url);
    document.head.appendChild(script);
    script.onload=function(){
      (fun!=null)&&(fun());
    }
  }
  air.add=function(tag){
    return document.createElement(tag)
  }
  air.ajax=function( url,callBackFunction,method,asyncFlag ){
    //异步请求
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if ( req.readyState == 4 ) {
          if( req.status==200 ){
            callBackFunction( req.response||req.responseText );
          }else if( req.status==404 ){
            callBackFunction( {error:'not find the url'} );
          }else{
            callBackFunction( {error:'ajax error,error code:'+req.status} );
          }
        };
       }
      req.open( method?method:"GET", url, asyncFlag||false );
      req.send( null );
  }
  air.post= function(url, data, callback, asyncFlag) {
    var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if ( req.readyState == 4 ) {
          if( req.status==200 ){
            callback( req.response||req.responseText );
          }else if( req.status==404 ){
            callback( {error:'not find the url'} );
          }else{
            callback( {error:'post error,error code:'+req.status} );
          }
        };
       }
      
      req.open( "POST", url, asyncFlag||false);
      req.send( data );
  }
    air.open=function(a){
      location.href=a;
    }
  //封装工具类
  var utils=function(){}
  air.utils=utils.prototype={
    //判断是否是ios系统
    isIOS:function(){
      if( ("ipod,ipad,iphone").indexOf(air.platform)>-1 ){
              return true;
      }
      return false;
    },
    version:function(){
      //获取手机版本
      var str = air.userAgent,
      rIOS=/os (\w*)/,
      rAndroid=/Android (\d\.\d(\.\d)*)/i;
      if( air.utils.isIOS() ){
          var v=str.match( rIOS )==null?0:str.match( rIOS );
          return v[1];
      }else{
          var v=str.match( rAndroid )==null?0:str.match( rAndroid );
          return v[1];  
      }
    },
    isSupport:function(){
      var a=air.utils.version();      
      if(a&&a.length>=3){
        a = a.substring(0,3).replace('_','.');
        if(Number(a)>='4.2'){
          return true;
        }
        return false
      }
    },
    request:function( paras ){
      //获取request
       var reg = new RegExp( "(^|&)"+ paras +"=([^&]*)(&|$)" );
       var r = window.location.search.substr( 1 ).match( reg );
       if ( r!=null ) 
            return unescape( r[2] ); 
       return null;
    },
    isFunction: function( obj ) {
      return typeof obj === "function";
    },
  
    isArray: function( obj ) {
      if(obj!=null)
      return obj.toString() === "[object NodeList]";
    },
    isNumeric: function( obj ) {
      return !isNaN( parseFloat(obj) ) && isFinite( obj );
    },
    next: function( n ) {
      n=n.nextSibling;
      for ( ; n; n = n.nextSibling ) { // 先判断再取，结果中包含n
        // nodeType === 1，只能是Element，过滤了其他的Text、Attr、Comment等元素
        if ( n.nodeType === 1) {
          return n;
        }
      }
    },
    prev:function(n){
      n=n.previousSibling;
      for ( ; n; n = n.previousSibling ) { // 先判断再取，结果中包含n
        // nodeType === 1，只能是Element，过滤了其他的Text、Attr、Comment等元素
        if ( n.nodeType === 1) {
          return n;
        }
      }
    },
    last:function(n){
      var r,
      n=n.nextSibling;
      for ( ; n; n = n.nextSibling ) { // 先判断再取，结果中包含n
        // nodeType === 1，只能是Element，过滤了其他的Text、Attr、Comment等元素
        if (n.nodeType === 1) {
          r= n;
        }
      }
      return r;
    },
    first:function(n){
      var r,
      n=n.previousSibling;
      for ( ; n; n = n.previousSibling ) { // 先判断再取，结果中包含n
        // nodeType === 1，只能是Element，过滤了其他的Text、Attr、Comment等元素
        if (n.nodeType === 1) {
          r= n;
        }
      }
      return r;
    },
    findIndex:function(n){
      //发现元素在兄弟元素的位置
      var count=0;
      n=n.previousSibling;
      for ( ; n; n = n.previousSibling ) { // 先判断再取，结果中包含n
        // nodeType === 1，只能是Element，过滤了其他的Text、Attr、Comment等元素
        if (n.nodeType === 1) {
          count++;
        }
      }
      return count;
    },
    is:function(dobj,dtype){
        var toStr = Object.prototype.toString;
        return (dtype === 'null' && dtype === 'Null' && dtype === 'NULL') || (dtype === 'Undefined' && dtype === 'undefined' && dtype === 'UNDEFINED') || toStr.call(dobj).slice(8,-1) == dtype;    
    },
    merger:function(so, po,override) {
      //合并
      if (arguments.length<2 || po === undefined ) {
        po = so;
        so = {};
      }
      for ( var key in po) {
        if ( !(key in so) || override!==false ) {
          so[key] = po[key];
        }
      }
      return so;
    }
  }
  
  //变化
  var transform =function(){}
  air.transform = transform.prototype={
    t3d:function(a,b,c){
      return"translate3d("+a+"px, "+b+"px, "+c+"px)"
    },
    r3d:function(a,b,c){
      return"rotate3d("+a+", "+b+", "+c+", "+d+"rad)"
    },
    tx:function(a){
     return "translateX("+a+"px)"
    },
    ty:function(a){
     return "translateY("+a+"px)"
    },
    t:function(a,b){
       return "translate("+a+"px,"+b+"px)"
    },
    scale:function(a){
     return "scale("+a+")"
    }
  }
  //日志
  var log =function(){}
  air.log = log.prototype={
    click:function(a){
      var c = new Image();
      c.src='/log.do?action=click&adId='+a;
      c = null;
    }
  }
  //本地存储
  var storage = function(){}
  air.storage=storage.prototype={
    add:function(key,value){
      localStorage.setItem(key,value);
    },
    get:function(key){
      return localStorage.getItem(key);
    },
    remove:function(key){
      localStorage.removeItem(key);
    },
    hasLocalStorage:function(){
      if (('localStorage' in window) && window['localStorage'] !== null) {
        return true;
      }
      return false;
    }
  }
  //cookie
  var cookie=function(){}
  air.cookie = cookie.prototype = {
    add:function(a,b){
       document.cookie = a + "="+ escape (b)+"; path=/" ;
    },
    get:function(name){
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }
  }
  //系统
    air.host=function(){
      var host = "null";
      var location = window.location;
      if(typeof withProtocol == 'undefined' || null == withProtocol)
        withProtocol=true;
      if(typeof url == "undefined" || null == url)
        url = location.href;
      var regex = /.*\:\/\/([^\/]*).*/;
      var match = url.match(regex);
      if(typeof match != "undefined" && null != match)host = match[1];
      return withProtocol?location.protocol+'//'+host:host;
    }
 //微薄
   var wb=function(){}
    air.wb=wb.prototype={
      log:false,
      appkey:'3869846634',
      client_secret:'560c206c2ac6b07a65f825f42c5c0f57',
      redirect_uri:'/weibo_js.html',
      addjs:function(fun){
        air.script("http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey="+this.appkey,true,fun)
      },
      //登陆
      login:function(){
        location.href="https://api.weibo.com/oauth2/authorize?client_id="+this.appkey+"&display=mobile&redirect_uri=http://"+location.host+this.redirect_uri;
      },
      //授权
      accessToken:function(){
        WB2.anyWhere(function(W){
        W.parseCMD("/oauth2/access_token", function(sResult, bStatus){
          air.wb.log&&console.debug(sResult, bStatus);
            if(bStatus){
              air.storage.add("access_token",sResult.access_token)
            }
          },
          {
            client_id: air.wb.appkey,
            client_secret:air.wb.client_secret,
            grant_type:'authorization_code',
            code:air.utils.request('code'),
            redirect_uri:'http://'+location.host+air.wb.redirect_uri
          });
        })
      },
      logout:function(){
        WB2.logout(function(){});
      },
      isLogin:function(){
        return WB2.checkLogin();
      },
      send:function(text,Picture){
        air.wb.log&&console.debug(air.storage.get("access_token"));
        if(Picture==null){
          WB2.anyWhere(function(W){
            W.parseCMD("/statuses/update.json", function(sResult, bStatus){
                air.wb.log&&console.debug(sResult, bStatus);
            },
            {
              status:encodeURIComponent(text),
              access_token:air.storage.get("access_token")
            });
          });
        }else{
          WB2.anyWhere(function(W){
            W.parseCMD("/statuses/upload.json", function(sResult, bStatus){
                air.wb.log&&console.debug(sResult, bStatus);
            },
            {
              status:encodeURIComponent(text),
              pic:Picture  
            });
          });
        }
      }
    }
   var nb = function(){}
  air.nb = nb.prototype = {
    sdkVersion:function(fun){
      NativeBridge.call('deviceInfo',{ADDR:'',SUB:'',BODY:''},function(e){
        fun(e)
      })
    },//sdk版本
    geo:function(fun){
      NativeBridge.call('location',{ADDR:'',SUB:'',BODY:''},function(e){
         fun(e)
      });
    },
    os:null,//系统
    osVersion:null,//系统版本
    lon:null,//lon坐标
    lat:null,//lat坐标
    tel:function(a){//拨打电话
      NativeBridge.call('tel',{ADDR:a,SUB:'',BODY:''});
    },
    sms:function(a,b){//发短信
      NativeBridge.call('sms',{ADDR:a,SUB:'',BODY:b});
    },
    mailto:function(a,b,c){//发邮件
      NativeBridge.call('mailto',{ADDR:a,SUB:b,BODY:c});
    },
    market:function(a){//market
      NativeBridge.call('market',{ADDR:a,SUB:'',BODY:''});
    },
    download:function(a){//下载
      NativeBridge.call('download',{ADDR:a,SUB:'',BODY:''});
    },
    wallpaper:function(a){//设置壁纸-只支持android
      NativeBridge.call('wallpaper',{ADDR:a,SUB:'',BODY:''});
    },
    saveImg:function(a){//保存图片
      NativeBridge.call('saveImg',{ADDR:a,SUB:'',BODY:''});
    },
    vibrator:function(a){//震动器
      NativeBridge.call('vibrator',{ADDR:a,SUB:'',BODY:''});
    },
    href:function(a){//打开浏览器
      NativeBridge.call('href',{ADDR:a,SUB:'',BODY:''});
    },
    goForward:function(a){//打开浏览器-前进
      NativeBridge.call('goForward',{ADDR:'',SUB:'',BODY:''});
    },
    goBack:function(a){//打开浏览器-后退
      NativeBridge.call('goBack',{ADDR:'',SUB:'',BODY:''});
    },
    reload:function(a){//打开浏览器-刷新
      NativeBridge.call('reload',{ADDR:'',SUB:'',BODY:''});
    },
    openAd:function(url,disableCache){//打开广告
        var fullUrl= '';
        if(!url)return '';
        if(!isNaN(url))url = "/contentExhibit.do?action=index&id="+url;
        
        var regex = /.*\:\/\/([^\/]*).*/;
        var match = url.match(regex);
        if(typeof match == "undefined" || null == match){
          fullUrl= air.host()+url;
        }else{
          fullUrl= url;
        }
        if(disableCache){
          fullUrl += (fullUrl.indexOf('?')>-1?"&":"?")+new Date().getTime();
        }
        NativeBridge.call('loadAd',{ADDR:fullUrl,SUB:'',BODY:''});
    },
    openApp:function(a,b,c){//打开app
      if(air.utils.isIOS()){
        NativeBridge.call('openApp',{"ADDR":a,"SUB":"","BODY":""});  
      }else{
        NativeBridge.call('openApp',{
            "ADDR":a||'',
            "SUB":b||'',
            "BODY":c||''
        });  
      }
    },
    camera:function(a){//打开摄像头
     if(air.utils.isIOS())
        NativeBridge.call('camera',{ADDR:'',SUB:'',BODY:'{"height":"320","width":"480"}'},a);
      else
        NativeBridge.call('camera',{ADDR:'',SUB:'',BODY:{height:"320",width:"480"}},a);
    },
    mic:function(a){//麦克风
        NativeBridge.call('mic',{ADDR:'prepare',SUB:'',BODY:''},a);
    },
    micOpen:function(a){//麦克风
        NativeBridge.call('mic',{ADDR:'open',SUB:'',BODY:''},a);
    },
    micClose:function(a){//麦克风
        NativeBridge.call('mic',{ADDR:'close',SUB:'',BODY:''},a);
    },
    light:function(a){//光线传感器
       NativeBridge.call('light',{ADDR:'prepare',SUB:'',BODY:''},a);
    },
    lightOpen:function(a){//光线传感器
       NativeBridge.call('light',{ADDR:'open',SUB:'',BODY:''},a);
    },
    lightClose:function(a){//光线传感器
       NativeBridge.call('light',{ADDR:'close',SUB:'',BODY:''},a);
    },
    compass:function(a){//罗盘
       NativeBridge.call('compass',{ADDR:'prepare',SUB:'',BODY:''},a);
    },
    compassOpen:function(a){//罗盘
       NativeBridge.call('compass',{ADDR:'open',SUB:'',BODY:''},a);
    },
    compassClose:function(a){//罗盘
       NativeBridge.call('compass',{ADDR:'close',SUB:'',BODY:''},a);
    },
    accelerometer:function(a){//加速度
       NativeBridge.call('accelerometer',{ADDR:'prepare',SUB:'',BODY:''},a);
    },
    accelerometerOpen:function(a){//加速度
       NativeBridge.call('accelerometer',{ADDR:'open',SUB:'',BODY:''},a);
    },
    accelerometerClose:function(a){//加速度
       NativeBridge.call('accelerometer',{ADDR:'close',SUB:'',BODY:''},a);
    },
    send:function(a,b){
       NativeBridge.call('send',{ADDR:a+"&"+Math.random(10),SUB:'',BODY:{page:b}});
    }
  }
  window.air=window.$=air;
})( window )
//其它扩展
Date.prototype.format = function(format)
{
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length==1 ? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
} 
Array.prototype.remove = function(obj) {    
    for (i in this) {    
        if (this[i] === obj) {    
            this.splice(i, 1);    
        }    
    }    
} 
var buildAdLink = function(url,params){
  var fullUrl= ''
  if(!url)return '';
  if(!isNaN(url))url = "/contentExhibit.do?action=index&id="+url;
  var regex = /.*\:\/\/([^\/]*).*/;
  var match = url.match(regex);
  if(typeof match == "undefined" || null == match){
    fullUrl= getHost()+url;
  }else{
    fullUrl= url;
  }
  if(params){
    fullUrl += (fullUrl.indexOf('?')>-1?"&":"?")+params;
  }
  return fullUrl;
}

//
var NativeBridge = {
  callbacksCount : 1,
  callbacks : {},
  // Automatically called by native layer when a result is available
  resultForCallback : function resultForCallback(callbackId, resultArray) {
    try {
      var callback = NativeBridge.callbacks[callbackId];
      if (!callback) return;
      callback(resultArray);
    } catch(e) {alert(e)}
  },
  
  // Use this in javascript to request native objective-c code
  // functionName : string (I think the name is explicit :p)
  // args : array of arguments
  // callback : function with n-arguments that is going to be called when the native code returned
  call : function call(functionName, args, callback) {
    var hasCallback = callback && typeof callback == "function";
    var callbackId = hasCallback ? NativeBridge.callbacksCount++ : 0;
    
    if (hasCallback)
      NativeBridge.callbacks[callbackId] = callback;
    
    if(top.location !== self.location){
      return;
    }
    if (navigator.userAgent.toLowerCase().indexOf('msie')>-1){
      var encodingArgs=encodeURIComponent(JSON.stringify(args));
      var notifyContent=functionName + ";"+encodingArgs+";" + callbackId;
      window.external.notify(notifyContent);
    }else{
      var iframe = document.createElement("IFRAME");
      iframe.setAttribute("src", "js-frame:" + functionName + ":" + callbackId+ ":" + encodeURIComponent(JSON.stringify(args)));
      document.documentElement.appendChild(iframe);
      iframe.parentNode.removeChild(iframe);
      iframe = null;
    }
  }
};
function resultForCallback(callbackId, resultArray)
{
  NativeBridge.resultForCallback(callbackId, resultArray.parseJSON());
}
 //类似settime操作
  timeFun= window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          function(callback) { setTimeout(callback, 1000 / 60); };
 //把sdk版本塞入cookie

 if(air.utils.request('v')!=null){
    air.cookie.add('sdkV',air.utils.request('v'));
 }
 
 function sendNativeUrl(){
   var url="",urls=location.href;
   if(urls.indexOf('hermes')!=-1){
      url="http://www.mincow.com/log.do?t=higgs_app_data&data=";//正式
   }else{
      url="http://192.168.1.247:8820/log.do?t=higgs_app_data&data=";
   }
   return url
 }
