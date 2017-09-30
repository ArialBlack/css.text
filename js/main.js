function customFileInput() {
    $('input[type="file"]').each(function (index) {
        var $input = $( this ),
            name = $input.attr('id');

        //need to insert label via js (no label in Drupal 8)
        $input.after('<label for="' + name + '"><span>Choose a file…</span></label>');

        var $label = $input.next( 'label' ),
            labelVal = $label.html();

        $input.on( 'change', function( e ) {
            var fileName = '';

            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else if( e.target.value )
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
                $label.find( 'span' ).html( fileName );
            else
                $label.html( labelVal );
        });

        $input
            .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
            .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });

    });

    
}

$(".webform-submission-adyax_test_form-form").validate();
customFileInput();
