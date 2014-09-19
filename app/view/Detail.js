Ext.define('App.view.Detail', {
    extend: 'Ext.Panel',
    xtype: 'detailcard',
    id: 'detailcard',
    
    config: {
        scrollable: true,
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
            },
{
                id: 'fone',

                html: ''
            },
            

        ]
    }
});

/**
 * Fix for Bug TOUCH-2665 (Sencha Touch 2.0.1 RC)
 * must be removed in next release
 */
Ext.define('App.Tabfix', {
    override: 'Ext.tab.Panel',
    doTabChange: function(tabBar, newTab) {
        this.setActiveItem(tabBar.indexOf(newTab));
    }
});