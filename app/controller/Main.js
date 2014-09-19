Ext.define('App.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'App.view.Detail',
        'Ext.MessageBox'
    ],
    
    config: {
        refs: {
            mainView: '#mainview',
            mainList: '#mainlist',
            detailCard: '#detailcard'
        },
        
        routes: {
            ':id': 'showViewById',
            'section/:id': 'showSectionById',
            'section/:id/:product': 'showSectionById'
        },
        
        control: {
            mainView: {
                activeitemchange: 'onMainViewActiveItemChange'
            },
            
            mainList: {
                activeitemchange: 'onListActiveItemChange'
            },
            
            detailCard: {
                activate: 'onDetailCardActivate'
            }
        },
        
        history: null
    },
    
    init: function() {
        
        // Setup start history point
        this.setHistory(this.getApplication().getHistory());
    },
    
    addToHistory: function(id) {
        
        // Add new point to history
        this.getHistory().add(new Ext.app.Action({
            url: id
        }), true);
    },
    
    onDetailCardActivate: function(card, list) {
        
        // Get selected leaf node
        var record = list.getLastNode();
        
        // Get and update description
        var descriptionField = card.down('#description');
        descriptionField.setHtml(record.get('description'));        
        
        // Get and update product button
        var detailBtn = card.down('#productBtn');
        detailBtn.setText(record.get('fone'));
        
        // Add custom tap listener for product button
        detailBtn.on({
            scope: record,
            tap: this.onDetailButtonTap
        });
    },
    
    onDetailButtonTap: function() {
        var record = this;

        
        document.location.href = 'tel:'+(record.get('fone'));



    },
    
    onMainViewActiveItemChange: function(comp, activeItem, oldItem) {
        if (Ext.isDefined(oldItem)) {
            var id = activeItem.getId();
            
            if (id === 'sections') {
                
                // Restore node position and history
                var mainList = this.getMainList();
                var lastNode = mainList.getLastNode();
                
                if (!lastNode.isRoot()) {
                    var path = lastNode.getPath('id').slice(5);//strip /root from begin
                    this.addToHistory('section' + path);
                } else {
                    this.addToHistory('sections');
                }                
                
            } else {
                this.addToHistory(id);
            }
        }
    },
    
    onListActiveItemChange: function(comp, activeRecord, oldRecord) {
        var record;
        
        if (activeRecord.getId() == 'detailcard' && 
            Ext.isObject(oldRecord)) {
            
            record = oldRecord.getStore().getNode();
            var leafRecord = comp.getLastNode();
            this.addToHistory('section/' + record.get('id') + '/' + leafRecord.get('id'));
        } else {
            record = activeRecord.getStore().getNode();
            var id = record.get('id');
            
            if (id === 'root') {
                this.addToHistory('sections');
            } else {
                this.addToHistory('section/' + record.get('id'));
            }
        }
    },
    
    showViewById: function(id) {
        var mainView = this.getMainView();
        
        Ext.each(mainView.getInnerItems(), function(item) {
            if (item.getId() == id) {
                mainView.setActiveItem(item);
            }
        });
    },
    
    goToSelectedNode: function(list, store, id, product) {
        var node = store.getNodeById(id);
                    
        if (node) {
            list.goToNode(node);
            
            if (Ext.isDefined(product)) {
                var productNode = store.getNodeById(product);
                
                if (productNode) {
                    list.goToLeaf(productNode);
                }
            }
        }
    },
    
    showSectionById: function(id, product) {
        this.showViewById('sections');
        
        var self = this;
        var mainList = this.getMainList();
        var store = mainList.getStore();
        
        if (store.loading) {
            store.on({
                load: function() {
                   self.goToSelectedNode(mainList, store, id, product);
                }
            });
        } else {
            self.goToSelectedNode(mainList, store, id, product);
        }
    }
    
});

/**
 * A base class for all event recognisers in Sencha Touch.
 *
 * Sencha Touch, by default, includes various different {@link Ext.event.recognizer.Recognizer} subclasses to recognise
 * events happening in your application.
 *
 * ## Default recognisers
 *
 * * {@link Ext.event.recognizer.Tap}
 * * {@link Ext.event.recognizer.DoubleTap}
 * * {@link Ext.event.recognizer.LongPress}
 * * {@link Ext.event.recognizer.Drag}
 * * {@link Ext.event.recognizer.HorizontalSwipe}
 * * {@link Ext.event.recognizer.Pinch}
 * * {@link Ext.event.recognizer.Rotate}
 *
 * ## Additional recognisers
 *
 * * {@link Ext.event.recognizer.VerticalSwipe}
 *
 * If you want to create custom recognisers, or disable recognisers in your Sencha Touch application, please refer to the
 * documentation in {@link Ext#setup}.
 *
 * @private
 */
Ext.define('Ext.event.recognizer.Recognizer', {
    mixins: ['Ext.mixin.Identifiable'],

    handledEvents: [],

    config: {
        onRecognized: Ext.emptyFn,
        onFailed: Ext.emptyFn,
        callbackScope: null
    },

    constructor: function(config) {
        this.initConfig(config);

        return this;
    },

    getHandledEvents: function() {
        return this.handledEvents;
    },

    onStart: Ext.emptyFn,

    onEnd: Ext.emptyFn,

    fail: function() {
        this.getOnFailed().apply(this.getCallbackScope(), arguments);

        return false;
    },

    fire: function() {
        this.getOnRecognized().apply(this.getCallbackScope(), arguments);
    }
});