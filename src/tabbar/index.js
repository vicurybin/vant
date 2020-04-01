import { createNamespace } from '../utils';
import { ParentMixin } from '../mixins/relation';
import { BORDER_TOP_BOTTOM } from '../utils/constant';

const [createComponent, bem] = createNamespace('tabbar');

export default createComponent({
  mixins: [ParentMixin('vanTabbar')],

  props: {
    route: Boolean,
    zIndex: [Number, String],
    activeColor: String,
    inactiveColor: String,
    value: {
      type: [Number, String],
      default: 0,
    },
    border: {
      type: Boolean,
      default: true,
    },
    fixed: {
      type: Boolean,
      default: true,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: null,
    },
  },

  computed: {
    fit() {
      if (this.safeAreaInsetBottom !== null) {
        return this.safeAreaInsetBottom;
      }
      // enable safe-area-inset-bottom by default when fixed
      return this.fixed;
    },
  },

  watch: {
    value: 'setActiveItem',
    children: 'setActiveItem',
  },

  methods: {
    setActiveItem() {
      this.children.forEach((item, index) => {
        item.active = (item.name || index) === this.value;
      });
    },

    onChange(active) {
      if (active !== this.value) {
        this.$emit('input', active);
        this.$emit('change', active);
      }
    },
  },

  render() {
    return (
      <div
        style={{ zIndex: this.zIndex }}
        class={[
          { [BORDER_TOP_BOTTOM]: this.border },
          bem({
            unfit: !this.fit,
            fixed: this.fixed,
          }),
        ]}
      >
        {this.slots()}
      </div>
    );
  },
});
