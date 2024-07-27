<template>
  <component :is="component" :class="elClass">
    <span class="m-button__label"><slot /></span>
  </component>
</template>

<script>
export default {
  name: 'm-button',
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
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary', 'tertiary', 'outline', 'link'].includes(value)
      }
    }
  },
  computed: {
    elClass() {
      return [
        'm-button',
        'm-button--size-' + this.size,
        'm-button--mode-' + this.mode,
        {
          'm-button--stretched': this.stretched,
          'm-button--loading': this.loading,
          'm-button--disabled': this.disabled,
          'm-button--active': this.active
        }
      ]
    }
  },
  methods: { }
}
</script>

<style lang="scss">
.m-button {
  --m-button--min-width: 80px;

  &--size-s {
    --m-button--height: 28px;
    --m-button--font-size: 1.4rem;
    --m-button--padding: 16px;
  }
  &--size-m {
    --m-button--height: 36px;
    --m-button--font-size: 1.6rem;
    --m-button--padding: 10px;
  }
  &--size-l {
    --m-button--height: 38px;
    --m-button--font-size: 1.8rem;
    --m-button--padding: 16px;
  }
}

.m-button {
  --m-button--background: #999 url('../assets/new/button.png') center / cover;
  --m-button--color: #DDD;

  --m-button--background-hover: rgba(100, 100, 255, .45);
  --m-button--color-hover: #FFFFA0;

  --m-button--background-active: #bdb985;
  --m-button--color-active: #262339;
}

.m-button {
  $parent: &;

  background: var(--m-button--background);
	border: 2px solid #373737;

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
        background-color: var(--m-button--background-hover);
        color: var(--m-button--color-hover);
        text-shadow: 2px 2px #202013CC;
        text-decoration: none;
      }
    }
  }
  
  &__label {
    box-shadow: var(--x-box-shadow);
    color: var(--m-button--color);
    text-shadow: 2px 2px #000A;
    
    max-width: 100%;
    min-height: var(--m-button--height);
    min-width: var(--m-button--min-width);
    
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 var(--m-button--padding);
  }



  &--stretched {
    display: block;
    flex-basis: 0;
    flex-grow: 1;
    width: 100%;
  }

  &--active {
    background: var(--m-button--background-active);
    color: var(--m-button--color-active);
  }

  &--disabled {
    opacity: 0.4;
    pointer-events: none;
    cursor: default;
    @media(hover: hover) {
      &:hover {
        background: var(--m-button--background);
        color: var(--m-button--color);
      }
    }
  }
}
</style>