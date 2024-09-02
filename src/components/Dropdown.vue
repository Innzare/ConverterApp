<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";

const props = defineProps({
  options: {
    required: false,
    type: Array,
    default: [],
  },
  value: {
    required: false,
    default: null,
  },
  label: {
    required: false,
    type: String,
    default: "",
  },
  width: {
    type: String,
    required: false,
    default: "64",
  },
});
const emit = defineEmits(["change"]);

const isOpen = ref(false);
const selectedValue = ref(null);
const box = ref(null);

watch(
  () => props.value,
  () => (selectedValue.value = props.value)
);

onMounted(() => {
  if (props.value) {
    selectedValue.value = props.value;
  }

  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const handleClickOutside = (event) => {
  if (box.value && !box.value.contains(event.target)) {
    isOpen.value = false;
  }
};

const onToggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const onOptionClick = (value) => {
  selectedValue.value = value;

  emit("change", value);
};

const selectedValueText = computed(() => {
  return props.options.find((item) => item.value === selectedValue.value)?.text;
});
</script>

<template>
  <div
    ref="box"
    class="dropdown-wrapper"
    :style="{ 'min-width': `${width}px` }"
    @click="onToggleDropdown"
  >
    <div
      :class="[
        'dropdown',
        {
          'dropdown--open': isOpen,
        },
        {
          'dropdown--selected': selectedValue,
        },
      ]"
    >
      <div class="label">{{ label }}</div>
      <div class="selected-value">
        {{ selectedValueText }}
      </div>
    </div>

    <Transition name="fade">
      <div
        v-show="isOpen"
        :class="['options-wrapper', { 'options-wrapper--open': isOpen }]"
      >
        <ul>
          <li
            v-for="option of options"
            :key="option.value"
            :class="[
              'option-item',
              { 'option-item--active': value === option.value },
            ]"
            @click="onOptionClick(option.value)"
          >
            {{ option.text }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>


<style scoped lang="scss">
.dropdown-wrapper {
  position: relative;
  user-select: none;
}

.dropdown {
  position: relative;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0px 0px 1px 1px rgba(0, 145, 255, 0.5) inset;
  transition: 0.25s;
  cursor: pointer;

  .label {
    font-size: 12px;
    transition: 0.25s;
  }

  &:hover {
    box-shadow: 0px 0px 1px 1px rgba(0, 145, 255, 1) inset;
  }

  &--open {
    box-shadow: 0px 0px 1px 1px rgba(0, 145, 255, 1) inset;
  }

  &--selected {
    .label {
      position: absolute;
      top: 0;
      transform: translateY(-50%);
      font-size: 10px;
      line-height: 12px;
      background-color: var(--vt-c-indigo);
      padding: 0 4px;
    }
  }
}

.options-wrapper {
  position: absolute;
  left: 0;
  top: calc(100% + 1px);
  z-index: 1000;
  width: 100%;
  border-radius: 4px;
  background-color: rgb(30, 95, 174);
  color: #fff;
  opacity: 0;
  transition: 0.25s;
  overflow: hidden;

  &--open {
    opacity: 1;
  }

  .option-item {
    padding: 8px 12px;
    border-bottom: 1px solid #00000060;
    cursor: pointer;

    &--active {
      background-color: rgb(18, 109, 220);
    }

    &:hover {
      background-color: rgb(18, 109, 220);
    }

    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>