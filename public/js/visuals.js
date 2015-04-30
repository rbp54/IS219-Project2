var genderChart = c3.generate({
    bindto: '#genderChart',
    data: {
        url: window.location.href + '/enrollment',
        mimeType: 'json',
        type: 'pie'
    }
});

var tuitionChart = c3.generate({
    bindto: '#tuitionChart',
    data: {
        url: window.location.href + '/tuition',
        mimeType: 'json'
    }
});

var barchart = c3.generate({
  bindto: '#barchart',
    data: {
        url:  '/topenrollment',
        mimeType: 'json',  
        type: 'bar'
    },
    axis: {
      y: {
        label: {
          text: 'Enrolment',
          position: 'outer-middle'
        },
        
      },
      x: {
        label: {
          text: 'Colleges',
          position: 'outer-middle'
        }
      }
    },
});