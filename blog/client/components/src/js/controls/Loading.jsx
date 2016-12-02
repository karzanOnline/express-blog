/**
 * 加载状态组件
 * @module controls/Loading
 */

import className from '../util/className.jsx';
import OverlayMixin from '../mixins/OverlayMixin.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import '../../css/loading.scss';
module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     * @see {@link module:mixins/OverlayMixin}
     */
    mixins: [ComponentBase, OverlayMixin],
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default loading
             * @type string
             * @desc 组件名称
             */
            cname: "loading",
            type: 'follow',
            size: 'small',
            mask: true
        };
    },
    getInitialState: function () {
        return {
            active: false,
            show: false,//overlay,只有type类型为full-screen时才生效[true,false]
            mask: this.props.mask
        };
    },
    open: function () {
        var _this = this;
        var node = ReactDOM.findDOMNode(_this);
        var type = _this.props.type;
        var e = arguments[0];
        // _this.doOpen(node, e, type);
        _this.setState({
            active: true,
            show: true
        });
    },
    doOpen: function () {
        var _this = this;
        var loader = arguments[0];//loading元素
        var loaderTrigger = $(arguments[1] ? arguments[1].target || arguments[1].currentTarget.target : 'body');//触发loading元素
        var loaderType = arguments[2];//loading类型
        var originPos;
        if (loaderType == 'follow') {
            _this.setPos(loaderTrigger, loader);
            _this.resize(loaderTrigger, loader);
        }
    },
    setPos: function (trigger, loader) {
        var offset, tiggerWidth, triggerHeight, loaderWidth, loaderHeight, originLeft, originTop;
        offset = trigger.offset();
        tiggerWidth = trigger.outerWidth();
        triggerHeight = trigger.outerHeight();
        loaderHeight = $(loader).height();
        loader.style.position = 'fixed';
        loader.style.left = offset.left + tiggerWidth + 'px';
        loader.style.top = (offset.top + parseInt((triggerHeight - loaderHeight) / 2)) + 'px';
        return {
            originLeft: offset.left + tiggerWidth,
            originTop: offset.top + parseInt((triggerHeight - loaderHeight) / 2)
        };
    },
    resize: function (trigger, loader) {
        var _this = this;
        var body, sLeft, sTop, pos;
        $(window).bind('scroll', function () {
            body = $('body');
            sLeft = body.scrollLeft();
            sTop = body.scrollTop();
            pos = _this.setPos(trigger, loader);
            loader.style.left = pos.originLeft - sLeft + 'px';
            loader.style.top = pos.originTop - sTop + 'px';
        });
        $(window).bind('resize', function () {
            _this.setPos(trigger, loader);
        });
    },
    close: function () {
        var _this = this;
        _this.setState({
            active: false,
            show: false
        });
    },
    render: function () {
        var _this = this;
        var type = _this.props.type || '';
        var size = _this.props.size || '';
        var classes = className(size, className(type, _this.getPropClass()));
        var options = (this.props.type == 'follow') && (<span className="load-txt">&nbsp;正在提交数据...</span>);
        return (
            <div {...this.props} className={classes} style={{display:this.state.active ? 'block' : 'none'}}>
                <span className="load-icon"></span>
                {options}
                {this.props.children}
            </div>
        )
    }
});