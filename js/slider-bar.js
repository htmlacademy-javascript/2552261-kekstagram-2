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

function onUpdateSlider(slider, handler) {
  slider.noUiSlider.on('update', handler);
}

function resetSlider(slider) {
  slider.noUiSlider.set([slider.noUiSlider.options.range.max]);
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

export {createSlider, resetSlider, updateSlider, onUpdateSlider};
