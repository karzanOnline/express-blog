/**
 * 单选框组合
 * @module controls/RadioGroup
 */

import className from '../util/className.jsx';
import empty from '../util/empty.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import ToggleMixin from '../mixins/ToggleMixin.jsx';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    getInitialState: function () {
        return {
            value: this.props.value || this.props.defaultValue
        };
    },
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default radiogroup
             * @type string
             * @desc 组件名称
             */
            cname: 'radiogroup',
            /**
             * @instance
             * @default
             * @type string
             * @desc 默认值，该值为下属 radio 组件的 value 属性
             */
            defaultValue: '',
            /**
             * @instance
             * @default undefined
             * @type string
             * @desc 指定当前组件的选中值
             */
            value: undefined,
            /**
             * @instance
             * @default null
             * @type function
             * @desc 当前值发生变更时的回调函数
             */
            onChange: null
        };
    },
    /**
     * 获取当前值
     * @instance
     * @returns {string}
     */
    getValue: function () {
        return this.state.value;
    },
    groupValidate: function (event, target) {
        if (target.props.value == this.state.value) {
            return false;
        } else {
            this.setState({
                value: target.props.value
            });

            this.dispatchEvent('change', this.getValue());
        }
    },
    componentWillReceiveProps: function (newProps) {
        var update = {};

        if(typeof newProps.value != 'undefined') {
            update.value = newProps.value;
        }

        this.setState(update);
    },
    render: function () {
        var children = null;
        if (this.props.children) {
            children = this.props.children.map(function (child, index) {
                var props = {
                    key: index
                };
                for (var key in child.props) {
                    if (child.props.hasOwnProperty(key)) {
                        props[key] = child.props[key];
                    }
                }

                if (this.state.value == child.props.value) {
                    props.selected = true;
                } else {
                    props.selected = false;
                }
                props.groupValidate = this.groupValidate;

                return React.cloneElement(child, props);
            }.bind(this));
        }
        var classes = className(this.props.className, this.getPropClass());
        return <div className={classes}>{children}</div>
    }
});