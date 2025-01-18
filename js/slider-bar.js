function createSlider(slider, startPoint, min, max, step) {
  noUiSlider.create(slider, {
    start: startPoint,
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

function onUpdateSlider(slider, handler) {
  slider.noUiSlider.on('update', handler);
}

function resetSlider(slider) {
  slider.noUiSlider.set(slider.noUiSlider.options.range.max);
}

function updateSlider(slider, startPoint, min, max, step) {
  slider.noUiSlider.updateOptions({
    start: startPoint,
    connect: true,
    range: {
      'min': min,
      'max': max
    }, step: step
  });
}

export {createSlider, resetSlider, updateSlider, onUpdateSlider};
