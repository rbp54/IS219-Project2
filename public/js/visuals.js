var chart = c3.generate({
    data: {
        url: window.location.href + '/enrollment',
        mimeType: 'json',
        type: 'pie'
    }
});