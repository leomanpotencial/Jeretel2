Ext.define('App.view.Detail', {
    extend: 'Ext.Panel',
    xtype: 'detailcard',
    id: 'detailcard',
    
    config: {
        scrollable: false,
        
        defaults: {
            styleHtmlContent: true
        },
        
        items: [
            {
                id: 'description',
                html: ''
            },
            
            {
                id: 'productBtn',
                xtype: 'button',
                ui: 'confirm',
                margin: 00,
                text: ''
            }
        ]
    }
});