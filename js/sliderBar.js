function createSlider(slider, start, min, max, step) {
  noUiSlider.create(slider, {
    start: [start],
    range: {
      'min': min,
      'max': max
    },
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
    step: step
  });
}

function updateValueField(slider, valueField) {
  slider.noUiSlider.on('update', () => {
    valueField.value = slider.noUiSlider.get();
  }
  );
}

function updateSlider(slider, start, min, max, step) {
  slider.noUiSlider.updateOptions({
    start: [start],
    connect: true,
    range: {
      'min': min,
      'max': max
    }, step: step
  });
}

function updateRange(slider, start, min, max, step) {
  slider.noUiSlider.updateOptions({start: [start], range: {'min': min, 'max': max}, step: step});
}

function resetSlider(slider) {
  slider.noUiSlider.set([slider.noUiSlider.options.range.max]);
}

function onUpdateSlider(slider, handler) {
  slider.noUiSlider.on('update', handler);
}

export {createSlider, updateValueField, resetSlider, updateSlider, onUpdateSlider, updateRange};
