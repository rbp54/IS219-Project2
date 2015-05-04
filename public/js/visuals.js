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
