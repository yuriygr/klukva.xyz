<template>
  <component :is="component" :class="elClass">
    <span class="mc-button__label"><slot /></span>
  </component>
</template>

<script>
export default {
  name: 'mc-button',
  props: {
    // Mods
    size: {
      type: String,
      default: 'm',
      validator(value) {
        return ['s', 'm', 'l'].includes(value)
      }
    },
    stretched: {
      type: Boolean,
      default: false
    },
    // State
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    // Other
    component: {
      type: String,
      default: 'button'
    },
    mode: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'orange', 'green', 'red'].includes(value)
      }
    }
  },
  computed: {
    elClass() {
      return [
        'mc-button',
        'mc-button--size-' + this.size,
        'mc-button--mode-' + this.mode,
        {
          'mc-button--stretched': this.stretched,
          'mc-button--loading': this.loading,
          'mc-button--disabled': this.disabled,
          'mc-button--active': this.active
        }
      ]
    }
  },
  methods: { }
}
</script>

<style lang="scss">
.mc-button {
  --mc-button--min-width: 80px;

  &--size-s {
    --mc-button--height: 28px;
    --mc-button--font-size: 1.4rem;
    --mc-button--padding: 16px;
  }
  &--size-m {
    --mc-button--height: 36px;
    --mc-button--font-size: 1.6rem;
    --mc-button--padding: 10px;
  }
  &--size-l {
    --mc-button--height: 38px;
    --mc-button--font-size: 1.8rem;
    --mc-button--padding: 16px;
  }
}

.mc-button {
  --mc-button--background: #999 url('/src/assets/new/button.png') center / cover;

  &--mode-default {
    --mc-button--background-color: transparent;
    --mc-button--background-color-hover: rgba(100, 100, 255, .45);

    --mc-button--color: #DDD;
    --mc-button--color-hover: #FFFFA0;
  }

  &--mode-orange {
    --mc-button--background-color: rgba(201, 128, 11, 0.45);
    --mc-button--background-color-hover: rgba(218, 153, 32, 0.45);

    --mc-button--color: #ededed;
    --mc-button--color-hover: #fff;
  }

  &--mode-green {
    --mc-button--background-color: rgba(20, 187, 32, 0.3);
    --mc-button--background-color-hover: rgba(47, 211, 59, 0.3);

    --mc-button--color: #ededed;
    --mc-button--color-hover: #fff;
  }
}

.mc-button {
  $parent: &;

  background: var(--mc-button--background);
	border: 2px solid #373737;
  max-width: 100%;
  min-height: var(--mc-button--height);
  min-width: var(--mc-button--min-width);

	image-rendering: pixelated;
	cursor: pointer;
	overflow: hidden;
	white-space: nowrap;
	user-select: none;

  font-family: 'Minecraft';
  font-optical-sizing: auto;
  margin: 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  appearance: none;
  position: relative;
  display: inline-block;
  border-radius: 2px;
  user-select: none;
  transition: var(--x-transition);

  @media(hover: hover) {
    &:hover {
      text-decoration: none;

      #{$parent}__label {
        background-color: var(--mc-button--background-color-hover);
        color: var(--mc-button--color-hover);
        text-shadow: 2px 2px #202013CC;
        text-decoration: none;
      }
    }
  }
  
  &__label {
    background: var(--mc-button--background-color);
    box-shadow: var(--x-box-shadow);
    color: var(--mc-button--color);
    text-shadow: 2px 2px #000A;
    
    max-width: 100%;
    min-height: var(--mc-button--height);
    min-width: var(--mc-button--min-width);
    
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 var(--mc-button--padding);
  }

  &--stretched {
    display: block;
    flex-basis: 0;
    flex-grow: 1;
    width: 100%;
  }

  &--active {
    background: var(--mc-button--background-active);
    color: var(--mc-button--color-active);
  }

  &--disabled {
    opacity: 0.4;
    pointer-events: none;
    cursor: default;
    @media(hover: hover) {
      &:hover {
        background: var(--mc-button--background);
        color: var(--mc-button--color);
      }
    }
  }
}
</style>