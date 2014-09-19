Ext.define('App.view.Sections', {
    extend: 'Ext.dataview.NestedList',
    xtype: 'sectionslist',
    id: 'mainlist',
    
    requires: [
        'App.store.Sections',
        'App.view.Detail'
    ],
    


        


    config: {
        title: 'Menu Principal',
        useTitleAsBackText: true,
        onItemDisclosure: true,
        scrollable: false,
        store: 'Sections',
        tabBarPosition: 'bottom',
        detailCard: {
            xtype: 'detailcard'
        },
        zIndex: 0
    },
    
    getTitleTextTpl: function() {
        return '<div>{name}</div>';
    },
    getItemTextTpl: function(node) {
        return '<div><p><img src="/img/{img}" width="50" height="50"><strong>{name}</strong></p></div>';
    }
});