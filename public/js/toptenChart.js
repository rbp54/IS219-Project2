var barchart = c3.generate({
    bindto: '#barchart',
    data: {
        url:  '/topenroll/topenrollment',
        mimeType: 'json',
        type: 'bar'
    },
    axis: {
        y: {
            label: {
                text: 'Enrolment',
                position: 'outer-middle'
            }

        },
        x: {
            label: {
                text: 'Colleges',
                position: 'outer-middle'
            }
        }
    }
});