/*Copyright (C) 2011 by WhiteFox AS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/

Ext.ns('simfla.ux.plugins');

simfla.ux.plugins.fireEvent = function (obj,evt){
                    var fireOnThis = obj;
                    if( document.createEvent ) {
                      var evObj = document.createEvent('MouseEvents');
                      evObj.initEvent( evt, true, false );
                      fireOnThis.dispatchEvent(evObj);
                    } else if( document.createEventObject ) {
                      fireOnThis.fireEvent('on'+evt);
                        }
                    }

simfla.ux.plugins.linkButton = Ext.extend(Ext.util.Observable, {

                    init: function(cmp){
                                        this.cmp = cmp;
                                        
                                        if(cmp.url && cmp.linkId){
                                                           
                                                            cmp.html = '<a id="' +  cmp.linkId + '" style="position:absolute; width: 0px; height: 0px; opacity: 0;" href="' + cmp.url + '">&nbsp;</a>';
                                                            if(cmp.rendered && cmp.html && document.getElementById(cmp.linkId)){
                                                                                document.getElementById(cmp.linkId).href = cmp.url;
                                                            }
                                                            cmp.handler = function(){simfla.ux.plugins.fireEvent(document.getElementById(cmp.linkId),'click');}
                                        }
                    },
                    setUrl: function(cmp, url){
                          cmp.url = url;
                          cmp.plugins[0].init(cmp);
                    }
});
    

Ext.preg('editableList', simfla.ux.plugins.linkButton);