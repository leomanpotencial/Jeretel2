  

Ext.define('App.view.Homepage', {
    extend: 'Ext.Panel',
    xtype: 'homepage',


    requires: [
        'Ext.TitleBar'
    ],
    
    config: {
        scrollable: false,
    
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Jeretel - Lista Telefônica Online'
            },

            {
    
                styleHtmlContent: true,
                style: 'border: none; padding: 0; margin: 0; margin-top: 0px;',
                layout: 'fit', //supposedly when we want our image to be the same size as its container without specifying width and height, we use this and set the background-size style of the image to 100% (for both width and height)
                    maxWidth: '100%',
                    width: '100%',
                    maxHeight: '100%',
                    height: '100%',
                    
    style: 'border: none; font: 0px Arial black',            
                html: '<div style="background-size: 100% 100% !important; margin:0; padding: 0px; -webkit-border-radius: 0px; background-color: rgba(255,255,255,0.5);"><p><img src="splash3.png"></p></div>',
                     
            }
        ]
    }
});



