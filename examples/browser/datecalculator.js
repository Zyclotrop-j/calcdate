!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("luxon"),require("date-fns")):"function"==typeof define&&define.amd?define(["luxon","date-fns"],n):"object"==typeof exports?exports.datecalculator=n(require("luxon"),require("date-fns")):e.datecalculator=n(e.luxon,e.datefns)}(this,function(e,n){return function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=2)}([function(n,t){n.exports=e},function(e,t){e.exports=n},function(e,n,t){"use strict";t.r(n);var r="NATIVEDATE",i="DATEXPRESION",o="DURATIONEXPRESSION",a="DURATIONOBJECT",u=function(e){return function(){throw new Error(e)}},s=function(e){var n={},t=function e(n){return n?(n^16*Math.random()>>n/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,e)},s=Object.assign({makeDuration:u('"makeDuration" option missing'),makeDate:u('"makeDate" option missing'),plus:u('"plus" option missing'),minus:u('"minus" option missing'),multiply:u('"multiply" option missing'),divide:u('"divide" option missing')},e,{interpolation:function(e){return n[e]}}),c=function(){function e(n,t,r,i){this.message=n,this.expected=t,this.found=r,this.location=i,this.name="SyntaxError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,e)}return function(e,n){function t(){this.constructor=e}t.prototype=n.prototype,e.prototype=new t}(e,Error),e.buildMessage=function(e,n){var t={literal:function(e){return'"'+i(e.text)+'"'},class:function(e){var n,t="";for(n=0;n<e.parts.length;n++)t+=e.parts[n]instanceof Array?o(e.parts[n][0])+"-"+o(e.parts[n][1]):o(e.parts[n]);return"["+(e.inverted?"^":"")+t+"]"},any:function(e){return"any character"},end:function(e){return"end of input"},other:function(e){return e.description}};function r(e){return e.charCodeAt(0).toString(16).toUpperCase()}function i(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(e){return"\\x0"+r(e)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(e){return"\\x"+r(e)})}function o(e){return e.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(e){return"\\x0"+r(e)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(e){return"\\x"+r(e)})}return"Expected "+function(e){var n,r,i,o=new Array(e.length);for(n=0;n<e.length;n++)o[n]=(i=e[n],t[i.type](i));if(o.sort(),o.length>0){for(n=1,r=1;n<o.length;n++)o[n-1]!==o[n]&&(o[r]=o[n],r++);o.length=r}switch(o.length){case 1:return o[0];case 2:return o[0]+" or "+o[1];default:return o.slice(0,-1).join(", ")+", or "+o[o.length-1]}}(e)+" but "+function(e){return e?'"'+i(e)+'"':"end of input"}(n)+" found."},{SyntaxError:e,parse:function(n,t){t=void 0!==t?t:{};var u,s={},c={Expression:0},l=0,f=["+",D("+",!1),"-",D("-",!1),function(e,n){return n.reduce(function(e,n){return"+"===n[1]?t.plus(e,n[3]):"-"===n[1]?t.minus(e,n[3]):void 0},e)},"*",D("*",!1),"/",D("/",!1),function(e,n){return n.reduce(function(e,n){return"*"===n[1]?t.multiply(e,n[3]):"/"===n[1]?t.divide(e,n[3]):void 0},e)},"(",D("(",!1),")",D(")",!1),function(e){return e},O("duration"),"P",D("P",!1),"T",D("T",!1),function(e,n,t,r,i,o,a){return{hours:i,minutes:o,seconds:a}},"",function(e,n,t,r){return{}},function(e,n,r,i,o){return t.makeDuration(Object.assign({},o,{years:e,months:n,weeks:r,days:i}),{type:a})},/^[0-9,.]/,g([["0","9"],",","."],!1,!1),"H",D("H",!1),function(){return parseFloat(h())},function(){return 0},"M",D("M",!1),"S",D("S",!1),"Y",D("Y",!1),"W",D("W",!1),"D",D("D",!1),O("optionalplusminus"),O("now"),"now",D("now",!0),"today",D("today",!0),"now()",D("now()",!0),"today()",D("today()",!0),function(){return t.makeDate(new Date,{type:r})},O("interpoltion"),"%",D("%",!1),/^[^%]/,g(["%"],!0,!1),function(e){return t.interpolation(e.join(""))},O("dateExpression"),"{",D("{",!1),/^[^}]/,g(["}"],!0,!1),"}",D("}",!1),function(e){return t.makeDate(e.join(""),{type:i})},O("durationExpression"),"[",D("[",!1),/^[^\]]/,g(["]"],!0,!1),"]",D("]",!1),function(e){return t.makeDuration(e.join(""),{type:o})},O("dateyear"),"19",D("19",!1),/^[7-9]/,g([["7","9"]],!1,!1),/^[0-9]/,g([["0","9"]],!1,!1),/^[2-9]/,g([["2","9"]],!1,!1),function(){return t.makeDate(new Date(parseInt(h(),10)),{type:r})},O("datemonth"),function(e,n){return t.makeDate(new Date(parseInt(e.join(""),10),parseInt(n.join(""),10)-1),{type:r})},O("completedate"),function(e,n,i){return t.makeDate(new Date(parseInt(e.join(""),10),parseInt(n.join(""),10)-1,parseInt(i.join(""),10)),{type:r})},O("datetime"),":",D(":",!1),function(){return t.makeDate(new Date(h()),{type:r})},O("datetimesec"),O("date"),".",D(".",!1),function(e,n,i,o,a,u,s,c){return t.makeDate(new Date(parseInt(e.join(""),10),parseInt(n.join(""),10)-1,parseInt(i.join(""),10),parseInt(o.join(""),10),parseInt(a.join(""),10),parseInt(u.join(""),10),parseInt(s.join(""),10)),{type:r})},O("month"),"12",D("12",!1),"11",D("11",!1),"10",D("10",!1),"0",D("0",!1),/^[1-9]/,g([["1","9"]],!1,!1),O("day"),"31",D("31",!1),"30",D("30",!1),"2",D("2",!1),"1",D("1",!1),O("hour"),/^[0-3]/,g([["0","3"]],!1,!1),O("minute"),/^[0-5]/,g([["0","5"]],!1,!1),O("second"),O("millisecond"),O("tiezone"),"Z",D("Z",!1),O("plusorminus"),O("quarter"),"quarter",D("quarter",!0),"s",D("s",!1),function(){return t.makeDuration({quarters:parseFloat(h(),10)},{type:a})},O("shortquarter"),O("weekday"),"weekday",D("weekday",!0),function(){return t.makeDuration({weekdays:parseFloat(h(),10)},{type:a})},O("shortweekday"),"wd",D("wd",!1),O("year"),"year",D("year",!0),function(){return t.makeDuration({years:parseFloat(h(),10)},{type:a})},O("shortyear"),"a",D("a",!1),O("ms"),"ms",D("ms",!1),function(){return t.makeDuration({milliseconds:parseFloat(h(),10)},{type:a})},"millisecond",D("millisecond",!0),"month",D("month",!0),function(){return t.makeDuration({months:parseFloat(h(),10)},{type:a})},O("Shortmonth"),"m",D("m",!1),"minute",D("minute",!0),function(){return t.makeDuration({minutes:parseFloat(h(),10)},{type:a})},O("shortminutes"),"min",D("min",!0),O("shorterminutes"),"mm",D("mm",!1),"hour",D("hour",!0),function(){return t.makeDuration({hours:parseFloat(h(),10)},{type:a})},O("shorthour"),"h",D("h",!1),"day",D("day",!0),function(){return t.makeDuration({days:parseFloat(h(),10)},{type:a})},O("shortday"),"d",D("d",!1),O("week"),"week",D("week",!0),function(){return t.makeDuration({weeks:parseFloat(h(),10)},{type:a})},O("fortnight"),"fortnight",D("fortnight",!0),function(){return t.makeDuration({weeks:2*parseFloat(h(),10)},{type:a})},O("Shortfortnight"),"fn",D("fn",!1),O("shortweek"),"w",D("w",!1),"second",D("second",!0),function(){return t.makeDuration({seconds:parseFloat(h(),10)},{type:a})},O("s"),O("u"),"u",D("u",!1),function(){return{unitless:parseFloat(h(),10)}},O("number"),O("integer"),function(){return{unitless:parseInt(h(),10)}},O("int"),O("float"),O("dot"),O("minus"),"−",D("−",!1),O("whitespace"),/^[ \t\n\r]/,g([" ","\t","\n","\r"],!1,!1)],d=[T(";!"),T('%;"/§#$%;^/P#2 ""6 7!.) &2"""6"7#/5$;^/,$;"/#$+$)($\'#(#\'#("\'#&\'#0Z*%;^/P#2 ""6 7!.) &2"""6"7#/5$;^/,$;"/#$+$)($\'#(#\'#("\'#&\'#&/)$8":$""! )("\'#&\'#'),T("%;#/§#$%;^/P#2%\"\"6%7&.) &2'\"\"6'7(/5$;^/,$;#/#$+$)($'#(#'#(\"'#&'#0Z*%;^/P#2%\"\"6%7&.) &2'\"\"6'7(/5$;^/,$;#/#$+$)($'#(#'#(\"'#&'#&/)$8\":)\"\"! )(\"'#&'#"),T('%2*""6*7+/R#;^/I$;!/@$;^/7$2,""6,7-/($8%:.%!")(%\'#($\'#(#\'#("\'#&\'#.# &;$'),T(";0.ï &;/.é &;[.ã &;..Ý &;%.× &;7.Ñ &;6.Ë &;5.Å &;4.¿ &;3.¹ &;2.³ &;D.­ &;E.§ &;F.¡ &;G. &;R. &;H. &;J. &;K. &;L.} &;I.w &;M.q &;S.k &;N.e &;O._ &;P.Y &;Q.S &;C.M &;B.G &;U.A &;V.; &;@.5 &;A./ &;T.) &;W.# &;Y"),T("<%;-/³#20\"\"6071/¤$;)/$;*/$;+/$;,/$%22\"\"6273/I#;&/@$;'/7$;(/.$8$:4$'('&%\"! )($'#(#'#(\"'#&'#.2 &% 5/* 8!:6!$%$#\")/,$8':7'%$#\"! )(''#(&'#(%'#($'#(#'#(\"'#&'#=.\" 7/"),T('%%;-/N#$48""5!790)*48""5!79&/2$2:""6:7;/#$+#)(#\'#("\'#&\'#/& 8!:<! ).. &% 5/& 8!:=! )'),T('%%;-/N#$48""5!790)*48""5!79&/2$2>""6>7?/#$+#)(#\'#("\'#&\'#/& 8!:<! ).. &% 5/& 8!:=! )'),T('%%;-/N#$48""5!790)*48""5!79&/2$2@""6@7A/#$+#)(#\'#("\'#&\'#/& 8!:<! ).. &% 5/& 8!:=! )'),T('%%;-/N#$48""5!790)*48""5!79&/2$2B""6B7C/#$+#)(#\'#("\'#&\'#/& 8!:<! ).. &% 5/& 8!:=! )'),T('%%;-/N#$48""5!790)*48""5!79&/2$2>""6>7?/#$+#)(#\'#("\'#&\'#/& 8!:<! ).. &% 5/& 8!:=! )'),T('%%;-/N#$48""5!790)*48""5!79&/2$2D""6D7E/#$+#)(#\'#("\'#&\'#/& 8!:<! ).. &% 5/& 8!:=! )'),T('%%;-/N#$48""5!790)*48""5!79&/2$2F""6F7G/#$+#)(#\'#("\'#&\'#/& 8!:<! ).. &% 5/& 8!:=! )'),T('<2 ""6 7!./ &2"""6"7#.# & 5=." 7H'),T('<%3J""5#7K.A &3L""5%7M.5 &3N""5%7O.) &3P""5\'7Q/& 8!:R! )=." 7I'),T('<%2T""6T7U/Y#$4V""5!7W/,#0)*4V""5!7W&&&#/7$2T""6T7U/($8#:X#!!)(#\'#("\'#&\'#=." 7S'),T('<%2Z""6Z7[/Y#$4\\""5!7]/,#0)*4\\""5!7]&&&#/7$2^""6^7_/($8#:`#!!)(#\'#("\'#&\'#=." 7Y'),T('<%2b""6b7c/Y#$4d""5!7e/,#0)*4d""5!7e&&&#/7$2f""6f7g/($8#:h#!!)(#\'#("\'#&\'#=." 7a'),T('<%%2j""6j7k/A#4l""5!7m/2$4n""5!7o/#$+#)(#\'#("\'#&\'#.` &%4p""5!7q/P#4n""5!7o/A$4n""5!7o/2$4n""5!7o/#$+$)($\'#(#\'#("\'#&\'#/& 8!:r! )=." 7i'),T('<%;Z/A#2"""6"7#/2$;8/)$8#:t#"" )(#\'#("\'#&\'#=." 7s'),T('<%;Z/Z#2"""6"7#/K$;8/B$2"""6"7#/3$;9/*$8%:v%#$" )(%\'#($\'#(#\'#("\'#&\'#=." 7u'),T('<%%;Z/#2"""6"7#/}$;8/t$2"""6"7#/e$;9/\\$22""6273/M$;:/D$2x""6x7y/5$;;/,$;>/#$+*)(*\'#()\'#((\'#(\'\'#(&\'#(%\'#($\'#(#\'#("\'#&\'#. &%;Z/#2"""6"7#/t$;8/k$2"""6"7#/\\$;9/S$22""6273/D$;:/;$2x""6x7y/,$;;/#$+))()\'#((\'#(\'\'#(&\'#(%\'#($\'#(#\'#("\'#&\'#/& 8!:z! )=." 7w'),T('<%%;Z/¤#2"""6"7#/$;8/$2"""6"7#/}$;9/t$22""6273/e$;:/\\$2x""6x7y/M$;;/D$2x""6x7y/5$;</,$;>/#$+,)(,\'#(+\'#(*\'#()\'#((\'#(\'\'#(&\'#(%\'#($\'#(#\'#("\'#&\'#.¥ &%;Z/#2"""6"7#/$;8/$2"""6"7#/t$;9/k$22""6273/\\$;:/S$2x""6x7y/D$;;/;$2x""6x7y/,$;</#$++)(+\'#(*\'#()\'#((\'#(\'\'#(&\'#(%\'#($\'#(#\'#("\'#&\'#/& 8!:z! )=." 7{'),T('<%;Z/È#2"""6"7#/¹$;8/°$2"""6"7#/¡$;9/$22""6273/$;:/$2x""6x7y/q$;;/h$2x""6x7y/Y$;</P$2}""6}7~/A$;=/8$;>//$8.:.(-+)\'%#! )(.\'#(-\'#(,\'#(+\'#(*\'#()\'#((\'#(\'\'#(&\'#(%\'#($\'#(#\'#("\'#&\'#=." 7|'),T('<2""67.f &2""67.Z &2""67.N &%2""67/2#4""5!7/#$+")("\'#&\'#.) &4""5!7=." 7'),T('<2""67.¤ &2""67. &%2""67/2#4n""5!7o/#$+")("\'#&\'#.s &%2""67/2#4n""5!7o/#$+")("\'#&\'#.N &%2""67/2#4""5!7/#$+")("\'#&\'#.) &4""5!7=." 7'),T('<%2""67/2#4""5!7/#$+")("\'#&\'#.s &%2""67/2#4n""5!7o/#$+")("\'#&\'#.N &%2""67/2#4n""5!7o/#$+")("\'#&\'#.) &4n""5!7o=." 7'),T('<%4""5!7/2#4n""5!7o/#$+")("\'#&\'#.) &4n""5!7o=." 7'),T('<%4""5!7/2#4n""5!7o/#$+")("\'#&\'#.) &4n""5!7o=." 7'),T('<%4n""5!7o/A#4n""5!7o/2$4n""5!7o/#$+#)(#\'#("\'#&\'#.N &%4n""5!7o/2#4n""5!7o/#$+")("\'#&\'#.) &4n""5!7o=." 7'),T('<2""67.x &%;?/n#4n""5!7o/_$4n""5!7o/P$2x""6x7y/A$4n""5!7o/2$4n""5!7o/#$+&)(&\'#(%\'#($\'#(#\'#("\'#&\'#=." 7'),T('<2 ""6 7!.) &2"""6"7#=." 7'),T('<%;X/S#;^/J$3¡""5\'7¢/;$2£""6£7¤." &"/\'$8$:¥$ )($\'#(#\'#("\'#&\'#=." 7 '),T('<%;X/S#;^/J$3¡""5\'7¢/;$2£""6£7¤." &"/\'$8$:¥$ )($\'#(#\'#("\'#&\'#=." 7¦'),T('<%;X/S#;^/J$3¨""5\'7©/;$2£""6£7¤." &"/\'$8$:ª$ )($\'#(#\'#("\'#&\'#=." 7§'),T('<%;X/S#;^/J$2¬""6¬7­/;$2£""6£7¤." &"/\'$8$:ª$ )($\'#(#\'#("\'#&\'#=." 7«'),T('<%;X/S#;^/J$3¯""5$7°/;$2£""6£7¤." &"/\'$8$:±$ )($\'#(#\'#("\'#&\'#=." 7®'),T('<%;X/S#;^/J$2³""6³7´/;$2£""6£7¤." &"/\'$8$:±$ )($\'#(#\'#("\'#&\'#=." 7²'),T('<%;X/S#;^/J$2¶""6¶7·/;$2£""6£7¤." &"/\'$8$:¸$ )($\'#(#\'#("\'#&\'#=." 7µ'),T('<%;X/S#;^/J$3¹""5+7º/;$2£""6£7¤." &"/\'$8$:¸$ )($\'#(#\'#("\'#&\'#=." 7'),T('<%;X/S#;^/J$3»""5%7¼/;$2£""6£7¤." &"/\'$8$:½$ )($\'#(#\'#("\'#&\'#=." 7'),T('<%;X/S#;^/J$2¿""6¿7À/;$2£""6£7¤." &"/\'$8$:½$ )($\'#(#\'#("\'#&\'#=." 7¾'),T('<%;X/S#;^/J$3Á""5&7Â/;$2£""6£7¤." &"/\'$8$:Ã$ )($\'#(#\'#("\'#&\'#=." 7'),T('<%;X/S#;^/J$3Å""5#7Æ/;$2£""6£7¤." &"/\'$8$:Ã$ )($\'#(#\'#("\'#&\'#=." 7Ä'),T('<%;X/S#;^/J$2È""6È7É/;$2£""6£7¤." &"/\'$8$:Ã$ )($\'#(#\'#("\'#&\'#=." 7Ç'),T('<%;X/S#;^/J$3Ê""5$7Ë/;$2£""6£7¤." &"/\'$8$:Ì$ )($\'#(#\'#("\'#&\'#=." 7'),T('<%;X/S#;^/J$2Î""6Î7Ï/;$2£""6£7¤." &"/\'$8$:Ì$ )($\'#(#\'#("\'#&\'#=." 7Í'),T('<%;X/S#;^/J$3Ð""5#7Ñ/;$2£""6£7¤." &"/\'$8$:Ò$ )($\'#(#\'#("\'#&\'#=." 7'),T('<%;X/S#;^/J$2Ô""6Ô7Õ/;$2£""6£7¤." &"/\'$8$:Ò$ )($\'#(#\'#("\'#&\'#=." 7Ó'),T('<%;X/S#;^/J$3×""5$7Ø/;$2£""6£7¤." &"/\'$8$:Ù$ )($\'#(#\'#("\'#&\'#=." 7Ö'),T('<%;X/S#;^/J$3Û""5)7Ü/;$2£""6£7¤." &"/\'$8$:Ý$ )($\'#(#\'#("\'#&\'#=." 7Ú'),T('<%;X/S#;^/J$2ß""6ß7à/;$2£""6£7¤." &"/\'$8$:Ý$ )($\'#(#\'#("\'#&\'#=." 7Þ'),T('<%;X/S#;^/J$2â""6â7ã/;$2£""6£7¤." &"/\'$8$:Ù$ )($\'#(#\'#("\'#&\'#=." 7á'),T('<%;X/S#;^/J$3ä""5&7å/;$2£""6£7¤." &"/\'$8$:æ$ )($\'#(#\'#("\'#&\'#=." 7'),T('<%;X/S#;^/J$2£""6£7¤/;$2£""6£7¤." &"/\'$8$:æ$ )($\'#(#\'#("\'#&\'#=." 7ç'),T('<%;X/S#;^/J$2é""6é7ê/;$2£""6£7¤." &"/\'$8$:ë$ )($\'#(#\'#("\'#&\'#=." 7è'),T('<;[.# &;Y=." 7ì'),T('<%;^/I#$4n""5!7o/,#0)*4n""5!7o&&&#/\'$8":î" )("\'#&\'#=." 7í'),T('<$4n""5!7o/,#0)*4n""5!7o&&&#=." 7ï'),T('<%;^/t#$4n""5!7o/,#0)*4n""5!7o&&&#/R$;\\/I$$4n""5!7o/,#0)*4n""5!7o&&&#/\'$8$:ë$ )($\'#(#\'#("\'#&\'#=." 7ð'),T('<2}""6}7~=." 7ñ'),T('<2ó""6ó7ô.) &2"""6"7#=." 7ò'),T('<$4ö""5!7÷0)*4ö""5!7÷&=." 7õ')],$=0,p=0,m=[{line:1,column:1}],b=0,y=[],v=0;if("startRule"in t){if(!(t.startRule in c))throw new Error("Can't start parsing from rule \""+t.startRule+'".');l=c[t.startRule]}function h(){return n.substring(p,$)}function D(e,n){return{type:"literal",text:e,ignoreCase:n}}function g(e,n,t){return{type:"class",parts:e,inverted:n,ignoreCase:t}}function O(e){return{type:"other",description:e}}function I(e){var t,r=m[e];if(r)return r;for(t=e-1;!m[t];)t--;for(r={line:(r=m[t]).line,column:r.column};t<e;)10===n.charCodeAt(t)?(r.line++,r.column=1):r.column++,t++;return m[e]=r,r}function w(e,n){var t=I(e),r=I(n);return{start:{offset:e,line:t.line,column:t.column},end:{offset:n,line:r.line,column:r.column}}}function j(e){$<b||($>b&&(b=$,y=[]),y.push(e))}function S(n,t,r){return new e(e.buildMessage(n,t),n,t,r)}function T(e){var n,t=new Array(e.length);for(n=0;n<e.length;n++)t[n]=e.charCodeAt(n)-32;return t}if((u=function e(t){for(var r,i,o=d[t],a=0,u=[],c=o.length,l=[],m=[];;){for(;a<c;)switch(o[a]){case 0:m.push(f[o[a+1]]),a+=2;break;case 1:m.push(void 0),a++;break;case 2:m.push(null),a++;break;case 3:m.push(s),a++;break;case 4:m.push([]),a++;break;case 5:m.push($),a++;break;case 6:m.pop(),a++;break;case 7:$=m.pop(),a++;break;case 8:m.length-=o[a+1],a+=2;break;case 9:m.splice(-2,1),a++;break;case 10:m[m.length-2].push(m.pop()),a++;break;case 11:m.push(m.splice(m.length-o[a+1],o[a+1])),a+=2;break;case 12:m.push(n.substring(m.pop(),$)),a++;break;case 13:l.push(c),u.push(a+3+o[a+1]+o[a+2]),m[m.length-1]?(c=a+3+o[a+1],a+=3):(c=a+3+o[a+1]+o[a+2],a+=3+o[a+1]);break;case 14:l.push(c),u.push(a+3+o[a+1]+o[a+2]),m[m.length-1]===s?(c=a+3+o[a+1],a+=3):(c=a+3+o[a+1]+o[a+2],a+=3+o[a+1]);break;case 15:l.push(c),u.push(a+3+o[a+1]+o[a+2]),m[m.length-1]!==s?(c=a+3+o[a+1],a+=3):(c=a+3+o[a+1]+o[a+2],a+=3+o[a+1]);break;case 16:m[m.length-1]!==s?(l.push(c),u.push(a),c=a+2+o[a+1],a+=2):a+=2+o[a+1];break;case 17:l.push(c),u.push(a+3+o[a+1]+o[a+2]),n.length>$?(c=a+3+o[a+1],a+=3):(c=a+3+o[a+1]+o[a+2],a+=3+o[a+1]);break;case 18:l.push(c),u.push(a+4+o[a+2]+o[a+3]),n.substr($,f[o[a+1]].length)===f[o[a+1]]?(c=a+4+o[a+2],a+=4):(c=a+4+o[a+2]+o[a+3],a+=4+o[a+2]);break;case 19:l.push(c),u.push(a+4+o[a+2]+o[a+3]),n.substr($,f[o[a+1]].length).toLowerCase()===f[o[a+1]]?(c=a+4+o[a+2],a+=4):(c=a+4+o[a+2]+o[a+3],a+=4+o[a+2]);break;case 20:l.push(c),u.push(a+4+o[a+2]+o[a+3]),f[o[a+1]].test(n.charAt($))?(c=a+4+o[a+2],a+=4):(c=a+4+o[a+2]+o[a+3],a+=4+o[a+2]);break;case 21:m.push(n.substr($,o[a+1])),$+=o[a+1],a+=2;break;case 22:m.push(f[o[a+1]]),$+=f[o[a+1]].length,a+=2;break;case 23:m.push(s),0===v&&j(f[o[a+1]]),a+=2;break;case 24:p=m[m.length-1-o[a+1]],a+=2;break;case 25:p=$,a++;break;case 26:for(r=o.slice(a+4,a+4+o[a+3]),i=0;i<o[a+3];i++)r[i]=m[m.length-1-r[i]];m.splice(m.length-o[a+2],o[a+2],f[o[a+1]].apply(null,r)),a+=4+o[a+3];break;case 27:m.push(e(o[a+1])),a+=2;break;case 28:v++,a++;break;case 29:v--,a++;break;default:throw new Error("Invalid opcode: "+o[a]+".")}if(!(l.length>0))break;c=l.pop(),a=u.pop()}return m[0]}(l))!==s&&$===n.length)return u;throw u!==s&&$<n.length&&j({type:"end"}),S(y,b<n.length?n.charAt(b):null,b<n.length?w(b,b+1):w(b,b))}}}();function l(e){for(var r=arguments.length,i=new Array(r>1?r-1:0),o=1;o<r;o++)i[o-1]=arguments[o];var a=i.map(function(e){var r=t();return n[r]=e,r}).map(function(n,t){return"".concat(e[t],"%").concat(n,"%")}).join(""),u="".concat(a).concat(e[e.length-1]);return c.parse(u,s)}return l.NATIVEDATE=r,l.DATEXPRESION=i,l.DURATIONEXPRESSION=o,l.DURATIONOBJECT=a,l._options=Object.freeze(s),Object.freeze(l)};s.NATIVEDATE=r,s.DATEXPRESION=i,s.DURATIONEXPRESSION=o,s.DURATIONOBJECT=a;var c=s;function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function f(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],r=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var d=function(e){var n=e.NATIVEDATE,t=e.DATEXPRESION,r=e.DURATIONEXPRESSION,i=e.DURATIONOBJECT,o={configurable:!1,enumerable:!1,writable:!1,value:function(){return JSON.stringify(this)}};function a(e){var n=b.exec(e);if(n){var t="-"===n[1]?-1:1,r=function(e){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t};return Object.assign(Object.defineProperty({},"toString",o),{years:r(n[2]),months:r(n[3]),weeks:r(n[4]),days:r(n[5]),hours:r(n[6]),minutes:r(n[7]),seconds:r(n[8])})}try{return Object.assign(Object.defineProperty({},"toString",o),JSON.parse(e))}catch(n){throw new Error("Found invalid duration "+e)}}function u(e){return new Date(e)}function s(e){return e instanceof Date&&!isNaN(e.valueOf())}var c={date:function(){throw new Error("Cannot merge two dates")},unitless:function(e,n){return e+1*n},milliseconds:function(e,n){return e-1*-n},seconds:function(e,n){return e-1e3*-n},minutes:function(e,n){return e-1e3*-n*60},hours:function(e,n){return e-1e3*-n*60*60},days:function(e,n){return e-1e3*-n*60*60*24},weekdays:function(e,n){return e-1e3*-n*60*60*24},weeks:function(e,n){return e-1e3*-n*60*60*24*7},months:function(e,n){return e-1e3*-n*60*60*24*31},quarters:function(e,n){return e-1e3*-n*60*60*24*7*52/4},years:function(e,n){return e-1e3*-n*60*60*24*7*52}},d={date:function(e,n){return{milliseconds:e.getTime()-n.getTime()}},unitless:function(e,n){return e-1*n},milliseconds:function(e,n){return e-1*n},seconds:function(e,n){return e-1e3*n},minutes:function(e,n){return e-1e3*n*60},hours:function(e,n){return e-1e3*n*60*60},days:function(e,n){return e-1e3*n*60*60*24},weekdays:function(e,n){return e-1e3*n*60*60*24},weeks:function(e,n){return e-1e3*n*60*60*24*7},months:function(e,n){return e-1e3*n*60*60*24*31},quarters:function(e,n){return e-1e3*n*60*60*24*7*52/4},years:function(e,n){return e-1e3*n*60*60*24*7*52}};function $(e,n,t,r){return s(e)&&s(n)?r.date(e,n):s(e)?new Date(Object.entries(n).reduce(function(e,n){var t=f(n,2),i=t[0],o=t[1];return r[i](e,o)},e)):s(n)?new Date(Object.entries(e).reduce(function(e,n){var t=f(n,2),i=t[0],o=t[1];return r[i](e,o)},n)):Object.entries(e).reduce(function(e,r){var i=f(r,2),o=i[0],a=i[1];return Object.assign(e,l({},o,t(a,n[o]||0)))},n)}function p(e){var n=Object.keys(e);return 1===n.length&&"unitless"===n[0]}function m(e,n,t){return Object.entries(n).reduce(function(n,r){var i=f(r,2),o=i[0],a=i[1];return Object.assign(n,l({},o,t(a,e)))},Object.defineProperty({},"toString",o))}var b=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,y=function(e){return e};return{makeDuration:function(e,n){var t,u=n.type;return(t={},l(t,r,a),l(t,i,function(e){return Object.defineProperty(Object.assign({},e),"toString",o)}),t)[u](e)},makeDate:function(e,r){var i,o=r.type;return(i={},l(i,t,u),l(i,n,y),i)[o](e)},plus:function(e,n){return $(e,n,function(e,n){return e+n},c)},minus:function(e,n){return $(e,n,function(e,n){return e-n},d)},multiply:function(e,n){return function(e,n){if(p(e)||p(n)){var t=function(e,n){return e*n};return p(e)?m(e.unitless,n,t):m(n.unitless,e,t)}throw new Error("Can't multiply unitfull vectors with each other!")}(e,n)},divide:function(e,n){return function(e,n){if(p(n))return m(n.unitless,e,function(e,n){return e/n});throw new Error("Can't divide unitfull vectors with each other!")}(e,n)}}},$=t(1);function p(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],r=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function y(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var v={milliseconds:1,seconds:1e3,minutes:6e4,hours:36e5,days:864e5,weekdays:864e5,weeks:6048e5,months:26784e5,quarters:78624e5,years:314496e5};Object.fromEntries=Object.fromEntries||function(e){return y(e).reduce(function(e,n){var t=b(n,2),r=t[0],i=t[1];return e[r]=i,e},{})};var h=Object.fromEntries(Object.entries({addMilliseconds:$.addMilliseconds,addSeconds:$.addSeconds,addMinutes:$.addMinutes,addHours:$.addHours,addWeekDays:$.addBusinessDays,addDays:$.addDays,addWeeks:$.addWeeks,addMonths:$.addMonths,addQuarters:$.addQuarters,addYears:$.addYears,subMilliseconds:$.subMilliseconds,subSeconds:$.subSeconds,subMinutes:$.subMinutes,subHours:$.subHours,subWeekDays:$.subBusinessDays,subDays:$.subDays,subWeeks:$.subWeeks,subMonths:$.subMonths,subQuarters:$.subQuarters,subYears:$.subYears,addUnitless:$.addMilliseconds,subUnitless:$.subMilliseconds}).map(function(e){var n=b(e,2),t=n[0],r=n[1];return[t.toLowerCase(),r]})),D=function(e,n){var t=e.NATIVEDATE,r=e.DATEXPRESION,i=e.DURATIONEXPRESSION,o=e.DURATIONOBJECT,a=n.console,u={configurable:!1,enumerable:!1,writable:!1,value:function(){return JSON.stringify(this)}},s={configurable:!1,enumerable:!1,writable:!1,value:!0},c=Symbol("isDuration"),l=function(){return Object.defineProperty(Object.defineProperty({},c,s),"toString",u)},f=function(e){return!0===e[c]};function d(e){var n=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/.exec(e);if(n){var t="-"===n[1]?-1:1,r=function(e){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t};return Object.assign(l(),{years:r(n[2]),months:r(n[3]),weeks:r(n[4]),days:r(n[5]),hours:r(n[6]),minutes:r(n[7]),seconds:r(n[8])})}try{return Object.assign(l(),JSON.parse(e))}catch(n){throw new Error("Found invalid duration "+e)}}var y=function(e){return Object($.isValid)(e)?"DATE":f(e)?"DURATION":Object($.isDate)(Object($.toDate)(e))&&!Object($.isValid)(e)?"INVALID DATE":m(e)},D=function(e){var n=Object.keys(e);return 1===n.length&&"unitless"===n[0]};return{makeDuration:function(e,n){var t,r=n.type;return(t={},p(t,i,d),p(t,o,function(e){return Object.assign(l(),e)}),t)[r](e)},makeDate:function(e,n){var i,o=n.type;return(i={},p(i,r,$.parseISO),p(i,t,function(e){return e}),i)[o](e)},plus:function(e,n){if(D(e)&&D(n))return{unitless:e.unitless+n.unitless};if(f(e)&&f(n))return Object.entries(e).reduce(function(e,n){var t=b(n,2),r=t[0],i=t[1];return Object.assign(e,p({},r,(e[r]||0)+i))},n);if(Object($.isValid)(e)&&Object($.isValid)(n))throw new Error("Can't add dates to each other!");if(Object($.isValid)(e)&&f(n))return Object.entries(n).reduce(function(e,n){var t=b(n,2),r=t[0],i=t[1];return h["add".concat(r)](e,i)},e);if(Object($.isValid)(n)&&f(e))return Object.entries(e).reduce(function(e,n){var t=b(n,2),r=t[0],i=t[1];return h["add".concat(r)](e,i)},n);var t="Invalid arguments for 'plus', expected (date, duration), (duration, date), (duration, duration) but found (".concat(y(e),", ").concat(y(n),")");throw a.error(t,e,n),new Error(t)},minus:function(e,n){if(D(e)&&D(n))return{unitless:e.unitless-n.unitless};if(f(e)&&f(n))return Object.entries(e).reduce(function(e,n){var t=b(n,2),r=t[0],i=t[1];return Object.assign(e,p({},r,(e[r]||0)-i))},n);if(Object($.isValid)(e)&&Object($.isValid)(n))return a.warn("Substracting two dates from each other is potentially unsafe as a loss of information occurs!"),Object.assign(l(),{milliseconds:Object($.differenceInMilliseconds)(e,n)});if(Object($.isValid)(e)&&f(n))return Object.entries(n).reduce(function(e,n){var t=b(n,2),r=t[0],i=t[1];return h["sub".concat(r)](e,i)},e);if(Object($.isValid)(n)&&f(e))return Object.entries(e).reduce(function(e,n){var t=b(n,2),r=t[0],i=t[1];return h["sub".concat(r)](e,i)},n);var t="Invalid arguments for 'minus', expected (date, duration), (duration, date), (duration, duration) but found (".concat(y(e),", ").concat(y(n),")");throw a.error(t,e,n),new Error(t)},multiply:function(e,n){if(D(e)&&D(n))return{unitless:e.unitless*n.unitless};if(f(e)&&D(n))return Object.entries(e).reduce(function(e,t){var r=b(t,2),i=r[0],o=r[1];return Object.assign(e,p({},i,o*n.unitless))},l());if(f(n)&&D(e))return Object.entries(n).reduce(function(n,t){var r=b(t,2),i=r[0],o=r[1];return Object.assign(n,p({},i,o*e.unitless))},l());var t="Invalid arguments for multiply, expected (duration, unitless) or (unitless, duration) but found (".concat(y(e),", ").concat(y(n),")");throw a.error(t,e,n),new Error(t)},divide:function(e,n){if(D(e)&&D(n))return{unitless:e.unitless/n.unitless};if(f(e)&&D(n))return Object.entries(e).reduce(function(e,t){var r=b(t,2),i=r[0],o=r[1];return Object.assign(e,p({},i,o/n.unitless))},l());if(f(n)&&D(e))return Object.entries(n).reduce(function(n,t){var r=b(t,2),i=r[0],o=r[1];return Object.assign(n,p({},i,o/e.unitless))},l());if(f(e)&&f(n)){a.warn("Dividing one duration by another is potentially unsafe! Assuming conversion table ".concat(JSON.stringify(v,null,"  "),"!"));var t=Object.entries(n).reduce(function(e,n){var t=b(n,2),r=t[0],i=t[1];return e+v[r]*i},0);return{unitless:Object.entries(e).reduce(function(e,n){var t=b(n,2),r=t[0],i=t[1];return e+v[r]*i},0)/t}}var r="Invalid arguments for divide, expected (duration, unitless) or (unitless, duration) but found (".concat(y(e),", ").concat(y(n),")");throw a.error(r,e,n),new Error(r)}}},g=t(0);function O(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],r=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var j=function(e){var n=Object.keys(e);return 1===n.length&&"unitless"===n[0]},S=function(e,n){var t=e.NATIVEDATE,r=e.DATEXPRESION,i=e.DURATIONEXPRESSION,o=e.DURATIONOBJECT,a=n.console;return{makeDuration:function(e,n){var t,r=n.type;return(t={},w(t,i,function(e){try{var n=JSON.parse(e);return Array.isArray(n)?g.Duration.fromObject(n[0],Object.assign({conversionAccuracy:"longterm"},n[1])):"string"==typeof n?g.Duration.fromISO(n,{conversionAccuracy:"longterm"}):"number"==typeof n?g.Duration.fromMillis(n,{conversionAccuracy:"longterm"}):g.Duration.fromObject(n,{conversionAccuracy:"longterm"})}catch(n){return g.Duration.fromISO(e,{conversionAccuracy:"longterm"})}}),w(t,o,function(e){return g.Duration.fromObject(e,{conversionAccuracy:"longterm"})}),t)[r](e)},makeDate:function(e,n){var i,o=n.type;return(i={},w(i,r,function(e){try{var n=JSON.parse(e);return Array.isArray(n)?g.DateTime.fromObject(n[0],n[1]):"string"==typeof n?g.DateTime.fromISO(n):"number"==typeof n?g.DateTime.fromMillis(n):g.DateTime.fromObject(n)}catch(n){return g.DateTime.fromISO(e)}}),w(i,t,g.DateTime.fromJSDate),i)[o](e)},plus:function(e,n){if(j(e)&&j(n))return{unitless:e.unitless+n.unitless};if(g.Interval.isInterval(e)&&g.Interval.isInterval(n))return e.union(n);if(g.Interval.isInterval(e)&&g.Duration.isDuration(n))return g.Interval.fromDateTimes(e.start.plus(n),e.end.plus(n));if(g.Interval.isInterval(n)&&g.Duration.isDuration(e))return g.Interval.fromDateTimes(n.start.plus(e),n.end.plus(e));if(g.Interval.isInterval(e)&&g.DateTime.isDateTime(n))return e.isAfter(n)?g.Interval.fromDateTimes(n,e.end):e.isBefore(n)?g.Interval.fromDateTimes(e.start,n):n;if(g.Interval.isInterval(n)&&g.DateTime.isDateTime(e))return e.plus(n.toDuration());if(g.Interval.isInterval(n)&&g.DateTime.isDateTime(e))return g.Interval.fromDateTimes(n.start.minus(e),n.end.minus(e));if(g.Duration.isDuration(e)&&g.Duration.isDuration(n))return e.plus(n);if(g.DateTime.isDateTime(e)&&g.DateTime.isDateTime(n))throw new Error("Can't add dates to each other!");if(g.DateTime.isDateTime(e)&&e.isValid&&g.Duration.isDuration(n))return e.plus(n);if(g.DateTime.isDateTime(n)&&n.isValid&&g.Duration.isDuration(e))return n.plus(e);var t="Invalid arguments for 'plus', expected (date, duration), (duration, date), (duration, duration) but found (".concat(e.invalidExplanation?"Invalid date ".concat(e.invalidExplanation):I(e),", ").concat(n.invalidExplanation?"Invalid date ".concat(n.invalidExplanation):I(n),")");throw a.error(t,e,n),new Error(t)},minus:function(e,n){if(j(e)&&j(n))return{unitless:e.unitless-n.unitless};if(g.Interval.isInterval(e)&&g.Interval.isInterval(n)){var t=e.intersection(n);return t||g.Interval.fromDateTimes(e.isBefore(n)?e.end:n.end,e.isBefore(n)?n.start:e.start)}if(g.Interval.isInterval(e)&&g.Duration.isDuration(n))return g.Interval.fromDateTimes(e.start.minus(n),e.end.minus(n));if(g.Interval.isInterval(n)&&g.Duration.isDuration(e))return g.Interval.fromDateTimes(n.start.minus(e),n.end.minus(e));if(g.Duration.isDuration(e)&&g.Duration.isDuration(n))return e.minus(n);if(g.Interval.isInterval(e)&&g.DateTime.isDateTime(n))return e.isBefore(n)?g.Interval.fromDateTimes(e.end,n):e.isAfter(n)?e:g.Interval.fromDateTimes(e.start,n);if(g.Interval.isInterval(n)&&g.DateTime.isDateTime(e))return e.minus(n.toDuration());if(g.DateTime.isDateTime(e)&&e.isValid&&g.DateTime.isDateTime(n)&&n.isValid)return g.Interval.fromDateTimes(e,n);if(g.DateTime.isDateTime(e)&&e.isValid&&g.Duration.isDuration(n))return e.minus(n);if(g.DateTime.isDateTime(n)&&n.isValid&&g.Duration.isDuration(e))return n.minus(e);var r="Invalid arguments for 'minus', expected (date, duration), (duration, date), (duration, duration) but found (".concat(e.invalidExplanation?"Invalid date ".concat(e.invalidExplanation):I(e),", ").concat(n.invalidExplanation?"Invalid date ".concat(n.invalidExplanation):I(n),")");throw a.error(r,e,n),new Error(r)},multiply:function(e,n){if(j(e)&&j(n))return{unitless:e.unitless*n.unitless};if(g.Duration.isDuration(e)&&j(n)){var t=Object.entries(e.toObject()).reduce(function(e,t){var r=O(t,2),i=r[0],o=r[1];return Object.assign(e,w({},i,o*n.unitless))},{});return e.set(t)}if(g.Duration.isDuration(n)&&j(e)){var r=Object.entries(n.toObject()).reduce(function(n,t){var r=O(t,2),i=r[0],o=r[1];return Object.assign(n,w({},i,o*e.unitless))},{});return n.set(r)}var i="Invalid arguments for multiply, expected (duration, unitless) or (unitless, duration) but found (".concat(e.invalidExplanation?"Invalid date ".concat(e.invalidExplanation):I(e),", ").concat(n.invalidExplanation?"Invalid date ".concat(n.invalidExplanation):I(n),")");throw a.error(i,e,n),new Error(i)},divide:function(e,n){if(j(e)&&j(n))return{unitless:e.unitless/n.unitless};if(g.Duration.isDuration(e)&&j(n)){var t=Object.entries(e.toObject()).reduce(function(e,t){var r=O(t,2),i=r[0],o=r[1];return Object.assign(e,w({},i,o/n.unitless))},{});return e.set(t)}if(g.Duration.isDuration(n)&&j(e)){var r=Object.entries(n.toObject()).reduce(function(n,t){var r=O(t,2),i=r[0],o=r[1];return Object.assign(n,w({},i,o/e.unitless))},{});return n.set(r)}if(g.Duration.isDuration(e)&&g.Duration.isDuration(n))return a.warn("Dividing one duration by another is potentially unsafe!"),{unitless:e.valueOf()/n.valueOf()};var i="Invalid arguments for divide, expected (duration, unitless) or (unitless, duration) but found (".concat(e.invalidExplanation?"Invalid date ".concat(e.invalidExplanation):I(e),", ").concat(n.invalidExplanation?"Invalid date ".concat(n.invalidExplanation):I(n),")");throw a.error(i,e,n),new Error(i)}}};t.d(n,"simpleCalculator",function(){return k}),t.d(n,"datefnsCalculator",function(){return E}),t.d(n,"luxonCalculator",function(){return x});var T={log:console.log.bind(console),warn:console.warn.bind(console),error:console.error.bind(console),info:console.info.bind(console),debug:console.debug.bind(console)},k=c(d(c)),E=c(D(c,{console:T})),x=c(S(c,{console:T}));n.default=c(d(c))}])});