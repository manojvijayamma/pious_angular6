(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"4lDY":function(l,n,t){"use strict";t.d(n,"b",function(){return s}),t.d(n,"c",function(){return a}),t.d(n,"a",function(){return d});var e=t("CcnG"),u=t("Ip0R"),i=t("o1U6"),o=t("e5OV"),s=e["\u0275crt"]({encapsulation:2,styles:[],data:{}});function r(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,2,"button",[["aria-label","Close"],["class","close"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.closeHandler()&&e),e},null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"span",[["aria-hidden","true"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\xd7"]))],null,null)}function a(l){return e["\u0275vid"](2,[(l()(),e["\u0275eld"](0,0,null,null,3,"div",[["role","alert"]],[[8,"className",0]],null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,r)),e["\u0275did"](2,16384,null,0,u.m,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),e["\u0275ncd"](null,0)],function(l,n){l(n,2,0,n.component.dismissible)},function(l,n){var t=n.component;l(n,0,0,"alert alert-"+t.type+(t.dismissible?" alert-dismissible":""))})}var d=e["\u0275ccf"]("ngb-alert",i.a,function(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"ngb-alert",[],null,null,null,a,s)),e["\u0275did"](1,49152,null,0,i.a,[o.a],null,null)],null,null)},{dismissible:"dismissible",type:"type"},{close:"close"},["*"])},PsaP:function(l,n,t){"use strict";var e=t("CcnG"),u=t("q7oS"),i=0,o=function(){return function(l){this.tplRef=l,this.id="ngb-slide-"+i++}}(),s=function(){function l(l){this.slide=new e.EventEmitter,this.interval=l.interval,this.wrap=l.wrap,this.keyboard=l.keyboard,this.pauseOnHover=l.pauseOnHover,this.showNavigationArrows=l.showNavigationArrows,this.showNavigationIndicators=l.showNavigationIndicators}return l.prototype.ngAfterContentChecked=function(){var l=this._getSlideById(this.activeId);this.activeId=l?l.id:this.slides.length?this.slides.first.id:null},l.prototype.ngOnInit=function(){this._startTimer()},l.prototype.ngOnChanges=function(l){"interval"in l&&!l.interval.isFirstChange()&&this._restartTimer()},l.prototype.ngOnDestroy=function(){clearInterval(this._slideChangeInterval)},l.prototype.select=function(l){this.cycleToSelected(l,this.getSlideEventDirection(this.activeId,l)),this._restartTimer()},l.prototype.prev=function(){this.cycleToPrev(),this._restartTimer()},l.prototype.next=function(){this.cycleToNext(),this._restartTimer()},l.prototype.pause=function(){this._stopTimer()},l.prototype.cycle=function(){this._startTimer()},l.prototype.cycleToNext=function(){this.cycleToSelected(this._getNextSlide(this.activeId),r.LEFT)},l.prototype.cycleToPrev=function(){this.cycleToSelected(this._getPrevSlide(this.activeId),r.RIGHT)},l.prototype.cycleToSelected=function(l,n){var t=this._getSlideById(l);t&&(t.id!==this.activeId&&this.slide.emit({prev:this.activeId,current:t.id,direction:n}),this.activeId=t.id)},l.prototype.getSlideEventDirection=function(l,n){return this._getSlideIdxById(l)>this._getSlideIdxById(n)?r.RIGHT:r.LEFT},l.prototype.keyPrev=function(){this.keyboard&&this.prev()},l.prototype.keyNext=function(){this.keyboard&&this.next()},l.prototype.onMouseEnter=function(){this.pauseOnHover&&this.pause()},l.prototype.onMouseLeave=function(){this.pauseOnHover&&this.cycle()},l.prototype._restartTimer=function(){this._stopTimer(),this._startTimer()},l.prototype._startTimer=function(){var l=this;this.interval>0&&(this._slideChangeInterval=setInterval(function(){l.cycleToNext()},this.interval))},l.prototype._stopTimer=function(){clearInterval(this._slideChangeInterval)},l.prototype._getSlideById=function(l){var n=this.slides.filter(function(n){return n.id===l});return n.length?n[0]:null},l.prototype._getSlideIdxById=function(l){return this.slides.toArray().indexOf(this._getSlideById(l))},l.prototype._getNextSlide=function(l){var n=this.slides.toArray(),t=this._getSlideIdxById(l);return t===n.length-1?this.wrap?n[0].id:n[n.length-1].id:n[t+1].id},l.prototype._getPrevSlide=function(l){var n=this.slides.toArray(),t=this._getSlideIdxById(l);return 0===t?this.wrap?n[n.length-1].id:n[0].id:n[t-1].id},l}(),r=function(l){return l[l.LEFT="left"]="LEFT",l[l.RIGHT="right"]="RIGHT",l}({});t.d(n,"a",function(){return a}),t.d(n,!1,function(){return s}),t.d(n,!1,function(){return o}),t.d(n,!1,function(){return u.a});var a=function(){function l(){}return l.forRoot=function(){return{ngModule:l,providers:[u.a]}},l}()},UE8e:function(l,n,t){"use strict";t.r(n);var e=t("CcnG"),u=function(){},i=t("4lDY"),o=t("pMnS"),s=t("kmKP"),r=t("KHAO"),a=function(){function l(l,n,t){this.userService=l,this.router=n,this.responseService=t}return l.prototype.ngOnInit=function(){var l=this;document.getElementById("spinner").style.display="block",this.userService.getDashboardData().subscribe(function(n){l.dashboardData=n},function(n){l.responseService.checkStatus(n)})},l.prototype.ngAfterViewInit=function(){document.getElementById("spinner").style.display="none"},l}(),d=t("ZYCi"),c=e["\u0275crt"]({encapsulation:0,styles:[[".mainim[_ngcontent-%COMP%]{background-color:#fff}.mainimage[_ngcontent-%COMP%]{width:100%;height:auto;text-align:center;margin-top:0}.hetext3[_ngcontent-%COMP%]{text-align:center;font-size:19pt;color:#fff;font-weight:700}.itemta[_ngcontent-%COMP%]{width:1200px;background-color:#096;margin-left:auto;margin-right:auto}#mycolgap[_ngcontent-%COMP%]{margin-left:15px;margin-right:15px}#myvergap[_ngcontent-%COMP%]{padding-bottom:50px;padding-top:50px}.sectext[_ngcontent-%COMP%]{text-align:center;font-size:11pt}#myvergap1[_ngcontent-%COMP%]{padding-bottom:15px;padding-top:15px}#myvergap2[_ngcontent-%COMP%]{padding-bottom:25px}.myh3[_ngcontent-%COMP%]{background-color:#92278f;text-align:center;color:#fff;font-weight:700;font-size:22pt}.hecont[_ngcontent-%COMP%]{background-color:#eef0e4;padding-top:25px;padding-bottom:25px}.myh2[_ngcontent-%COMP%]{background-color:#9e131a;text-align:center;color:#fff;font-weight:700;font-size:22pt}.hetext1[_ngcontent-%COMP%]{text-align:center;font-size:30pt;font-weight:400;padding-bottom:0;line-height:50px;color:#2f2e2e}.hetext2[_ngcontent-%COMP%]{text-align:center;font-size:13pt;color:#2f2e2e;font-weight:400;padding-bottom:50px}.myh1[_ngcontent-%COMP%]{text-align:center;color:#2f2e2e;font-weight:400;font-size:19pt;padding-top:10px;padding-bottom:10px}.brimage[_ngcontent-%COMP%]{width:100%;height:auto;text-align:center;max-width:100%}"]],data:{animation:[{type:7,name:"routerTransition",definitions:[{type:0,name:"void",styles:{type:6,styles:{},offset:null},options:void 0},{type:0,name:"*",styles:{type:6,styles:{},offset:null},options:void 0},{type:1,expr:":enter",animation:[{type:6,styles:{transform:"translateY(100%)"},offset:null},{type:4,styles:{type:6,styles:{transform:"translateY(0%)"},offset:null},timings:"0.5s ease-in-out"}],options:null},{type:1,expr:":leave",animation:[{type:6,styles:{transform:"translateY(0%)"},offset:null},{type:4,styles:{type:6,styles:{transform:"translateY(-100%)"},offset:null},timings:"0.5s ease-in-out"}],options:null}],options:{}}]}});function p(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,0,"div",[["style","border:15px solid #000;margin-top:25px;"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,52,"div",[],[[24,"@routerTransition",0]],null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,1,"div",[["class","mainim"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,0,"img",[["alt",""],["class","mainimage"],["src","assets/images/ARROYO-TAMAROCK-MT-WALLPAPER.jpg"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,46,"div",[["class","hecont"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,45,"div",[["class","container"],["id","myvergap"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,9,"div",[["class","row justify-content-md-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,4,"div",[["class","hetext1"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,3,"p",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["SAFER TYREE IS OFFERING YOU THE BEST "])),(l()(),e["\u0275eld"](10,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" SOLUTION FOR YOUR TIRE NEED."])),(l()(),e["\u0275eld"](12,0,null,null,3,"div",[["class","hetext2"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["We sell tire brands like Bridgestone, Michelin, Dunlop, Goodyear, Pirelli, Continental,"])),(l()(),e["\u0275eld"](14,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Sumitomo, Nexen, Kumho, Hankook and other value tire."])),(l()(),e["\u0275eld"](16,0,null,null,34,"div",[["class","row justify-content-md-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](17,0,null,null,10,"div",[["class","col-sm-4"],["id","myvergap2"]],null,null,null,null,null)),(l()(),e["\u0275eld"](18,0,null,null,9,"div",[["class","mycolbor"]],null,null,null,null,null)),(l()(),e["\u0275eld"](19,0,null,null,4,"div",[["class","myh1"]],null,null,null,null,null)),(l()(),e["\u0275eld"](20,0,null,null,3,"div",[["class","style-illkyd23_comp-il55pxpk style-illkyd23_non-scaling-stroke style-illkyd23svg"],["id","comp-il55pxpksvg"],["style","fill-opacity:0;stroke-width:2;stroke:rgba(206, 32, 38, 1);stroke-opacity:1;fill:#68B04D"]],null,null,null,null,null)),(l()(),e["\u0275eld"](21,0,null,null,2,":svg:svg",[["preserveAspectRatio","xMidYMid meet"],["role","img"],["style","stroke-width: 2px;height: 40px !important;"],["viewBox","-1.1224351659897849 -16.148634633710316 102.24526682207662 133.2286810105847"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(l()(),e["\u0275eld"](22,0,null,null,1,":svg:g",[],null,null,null,null,null)),(l()(),e["\u0275eld"](23,0,null,null,0,":svg:path",[["d","M96.706 22.15L35.708 87.655a4.859 4.859 0 0 1-6.869.204L3.507 64.037c-1.955-1.82-2.051-4.907-.212-6.862l2.923-3.667c1.837-1.973 4.895-2.06 6.869-.212L32.67 71.185 87.198 13.64c1.837-1.967 4.409-2.825 6.966-.456l2.331 2.125c1.952 1.818 2.05 4.887.211 6.841z"]],null,null,null,null,null)),(l()(),e["\u0275eld"](24,0,null,null,1,"div",[["class","myh1"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["AVAILABILITY"])),(l()(),e["\u0275eld"](26,0,null,null,1,"div",[["class","sectext"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["We specialize in unusual and hard to find tyres! Most sizes and brands in stock or available for immediate delivery!"])),(l()(),e["\u0275eld"](28,0,null,null,10,"div",[["class","col-sm-4"],["id","myvergap2"]],null,null,null,null,null)),(l()(),e["\u0275eld"](29,0,null,null,9,"div",[["class","mycolbor"]],null,null,null,null,null)),(l()(),e["\u0275eld"](30,0,null,null,4,"div",[["class","myh1"]],null,null,null,null,null)),(l()(),e["\u0275eld"](31,0,null,null,3,"div",[["class","style-il55snrh_comp-il55r9gf style-il55snrh_non-scaling-stroke style-il55snrhsvg"],["id","comp-il55r9gfsvg"],["style","fill-opacity:0;stroke-width:2;stroke:rgba(206, 32, 38, 1);stroke-opacity:1;fill:#68B04D"]],null,null,null,null,null)),(l()(),e["\u0275eld"](32,0,null,null,2,":svg:svg",[["preserveAspectRatio","xMidYMid meet"],["role","img"],["style","stroke-width: 2px;height: 40px !important;"],["viewBox","35.49286270141602 17.50665664672853 122.0122833251953 158.9857025146484"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(l()(),e["\u0275eld"](33,0,null,null,1,":svg:g",[],null,null,null,null,null)),(l()(),e["\u0275eld"](34,0,null,null,0,":svg:path",[["d","M79.534 71.002c0-2.485 2.963-11.852 16.822-11.852 15.484 0 16.631 9.462 16.631 11.47 0 5.83 4.683 10.514 10.514 10.514 5.83 0 10.514-4.683 10.514-10.514 0-9.08-3.632-17.3-10.323-23.322-3.728-3.345-8.029-5.83-13.19-7.36-.765-.287-2.294-.86-2.294-3.154v-4.779c.096-5.926-4.875-10.801-10.896-10.801-6.022 0-10.992 4.875-10.992 10.896v4.779c0 2.103-1.625 2.676-2.39 2.867-16.058 4.683-25.424 18.16-25.424 31.255 0 43.394 57.54 24.182 57.54 51.327 0 3.345-2.103 12.617-19.212 12.617-17.205 0-19.976-12.425-19.976-17.3 0-5.83-4.683-10.514-10.514-10.514s-10.514 4.683-10.514 10.514c0 10.514 4.014 20.168 11.183 27.145 4.588 4.397 10.227 7.551 16.535 9.367.86.287 2.867 2.294 2.867 3.823v3.919c0 6.022 4.97 10.896 10.992 10.896 6.022 0 10.896-4.779 10.896-10.801v-4.683c0-1.529 1.434-2.676 2.294-2.867 5.639-1.434 10.514-3.919 14.719-7.264 7.646-6.213 11.852-15.006 11.852-24.755.002-45.975-57.634-30.969-57.634-51.423z"]],null,null,null,null,null)),(l()(),e["\u0275eld"](35,0,null,null,1,"div",[["class","myh1"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["UNBEATABLE PRICES"])),(l()(),e["\u0275eld"](37,0,null,null,1,"div",[["class","sectext"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["We\u2019ll beat any price on every product we carry by 2%. Any competitor\u2019s authorized price. Any brand!"])),(l()(),e["\u0275eld"](39,0,null,null,11,"div",[["class","col-sm-4"],["id","myvergap2"]],null,null,null,null,null)),(l()(),e["\u0275eld"](40,0,null,null,10,"div",[["class","mycolbor"]],null,null,null,null,null)),(l()(),e["\u0275eld"](41,0,null,null,5,"div",[["class","myh1"]],null,null,null,null,null)),(l()(),e["\u0275eld"](42,0,null,null,4,"div",[["class","style-il55t163_comp-il55rked style-il55t163_non-scaling-stroke style-il55t163svg"],["id","comp-il55rkedsvg"],["style","fill-opacity:0;stroke-width:2;stroke:rgba(206, 32, 38, 1);stroke-opacity:1;fill:#68B04D"]],null,null,null,null,null)),(l()(),e["\u0275eld"](43,0,null,null,3,":svg:svg",[["data-type","shape"],["height","200"],["preserveAspectRatio","xMidYMid meet"],["role","img"],["style","stroke-width: 2px;height: 40px !important;"],["viewBox","15.785064943375119 -9.734604312527566 168.4298548544607 219.46920481035787"],["width","200"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(l()(),e["\u0275eld"](44,0,null,null,2,":svg:g",[],null,null,null,null,null)),(l()(),e["\u0275eld"](45,0,null,null,0,":svg:path",[["d","M169.396 90.483L98.81 19.898H80.173l-.199.198L159.878 100l-79.904 80.102h19.035l70.387-70.387 9.715-9.715-9.715-9.517z"]],null,null,null,null,null)),(l()(),e["\u0275eld"](46,0,null,null,0,":svg:path",[["d","M120.026 100l-9.518-9.517-70.585-70.585H21.087l-.198.198L100.991 100l-80.102 80.102h19.233l70.386-70.387 9.518-9.715z"]],null,null,null,null,null)),(l()(),e["\u0275eld"](47,0,null,null,1,"div",[["class","myh1"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["FAST DELIVERY"])),(l()(),e["\u0275eld"](49,0,null,null,1,"div",[["class","sectext"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["We offer daily (in some areas we deliver two, three or four times a day) delivery at no charge. "])),(l()(),e["\u0275eld"](51,0,null,null,2,"div",[["class","container"],["id","myvergap"]],null,null,null,null,null)),(l()(),e["\u0275eld"](52,0,null,null,1,"div",[["class","row justify-content-md-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](53,0,null,null,0,"img",[["src","assets/images/brands.png"]],null,null,null,null,null))],null,function(l,n){l(n,1,0,void 0)})}var h=e["\u0275ccf"]("app-dashboard",a,function(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-dashboard",[],null,null,null,p,c)),e["\u0275did"](1,4308992,null,0,a,[s.a,d.l,r.a],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),g=t("Ip0R"),f=t("q7oS"),y=t("e5OV"),v=t("PsaP"),m=t("bt6x"),x=function(){},b=t("MviD");t.d(n,"DashboardModuleNgFactory",function(){return w});var w=e["\u0275cmf"](u,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,o.a,h]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,g.o,g.n,[e.LOCALE_ID,[2,g.z]]),e["\u0275mpd"](4608,f.a,f.a,[]),e["\u0275mpd"](4608,y.a,y.a,[]),e["\u0275mpd"](1073742336,g.b,g.b,[]),e["\u0275mpd"](1073742336,v.a,v.a,[]),e["\u0275mpd"](1073742336,m.a,m.a,[]),e["\u0275mpd"](1073742336,d.o,d.o,[[2,d.u],[2,d.l]]),e["\u0275mpd"](1073742336,x,x,[]),e["\u0275mpd"](1073742336,b.a,b.a,[]),e["\u0275mpd"](1073742336,u,u,[]),e["\u0275mpd"](1024,d.j,function(){return[[{path:"",component:a}]]},[])])})},bt6x:function(l,n,t){"use strict";t.d(n,"a",function(){return u}),t("o1U6");var e=t("e5OV"),u=function(){function l(){}return l.forRoot=function(){return{ngModule:l,providers:[e.a]}},l}()},e5OV:function(l,n,t){"use strict";t.d(n,"a",function(){return e});var e=function(){this.dismissible=!0,this.type="warning"}},o1U6:function(l,n,t){"use strict";t.d(n,"a",function(){return u});var e=t("CcnG"),u=(t("e5OV"),function(){function l(l){this.close=new e.EventEmitter,this.dismissible=l.dismissible,this.type=l.type}return l.prototype.closeHandler=function(){this.close.emit(null)},l}())},q7oS:function(l,n,t){"use strict";t.d(n,"a",function(){return e});var e=function(){this.interval=5e3,this.wrap=!0,this.keyboard=!0,this.pauseOnHover=!0,this.showNavigationArrows=!0,this.showNavigationIndicators=!0}}}]);