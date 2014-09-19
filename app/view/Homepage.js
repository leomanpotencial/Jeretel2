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
                maxWidth: 750,
                html: '<div style="color:#550000; margin:0; padding: 0px; -webkit-border-radius: 0px; background-color: rgba(255,255,255,0.5);"><p><img src="splash3.png" width="100%" height="10%"></p></div>'
            }
        ]
    }
});