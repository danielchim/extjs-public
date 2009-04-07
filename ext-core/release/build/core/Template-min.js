/*
 * Ext Core Library 3.0 Beta
 * http://extjs.com/
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * 
 * The MIT License
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */


Ext.Template=function(html){var me=this,a=arguments,buf=[];if(Ext.isArray(html)){html=html.join("");}else if(a.length>1){Ext.each(a,function(v){if(Ext.isObject(v)){Ext.apply(me,v);}else{buf.push(v);}});html=buf.join('');}
me.html=html;if(me.compiled){me.compile();}};Ext.Template.prototype={applyTemplate:function(values){var me=this;return me.compiled?me.compiled(values):me.html.replace(me.re,function(m,name){return values[name]!==undefined?values[name]:"";});},set:function(html,compile){var me=this;me.html=html;me.compiled=null;return compile?me.compile():me;},re:/\{([\w-]+)\}/g,compile:function(){var me=this,sep=Ext.isGecko?"+":",";function fn(m,name){name="values['"+name+"']";return"'"+sep+name+" == undefined ? '' : "+name+args+")"+sep+"'";}
eval("this.compiled = function(values){ return "+(Ext.isGecko?"'":"[")+
me.html.replace(/\\/g,'\\\\').replace(/(\r\n|\n)/g,'\\n').replace(/'/g,"\\'").replace(this.re,fn)+
(Ext.isGecko?"';};":"'].join('');};"));return me;},insertFirst:function(el,values,returnElement){return this.doInsert('afterBegin',el,values,returnElement);},insertBefore:function(el,values,returnElement){return this.doInsert('beforeBegin',el,values,returnElement);},insertAfter:function(el,values,returnElement){return this.doInsert('afterEnd',el,values,returnElement);},append:function(el,values,returnElement){return this.doInsert('beforeEnd',el,values,returnElement);},doInsert:function(where,el,values,returnEl){el=Ext.getDom(el);var newNode=Ext.DomHelper.insertHtml(where,el,this.applyTemplate(values));return returnEl?Ext.get(newNode,true):newNode;},overwrite:function(el,values,returnElement){el=Ext.getDom(el);el.innerHTML=this.applyTemplate(values);return returnElement?Ext.get(el.firstChild,true):el.firstChild;}};Ext.Template.prototype.apply=Ext.Template.prototype.applyTemplate;Ext.Template.from=function(el,config){el=Ext.getDom(el);return new Ext.Template(el.value||el.innerHTML,config||'');};