# Tip

## Description:

Tip is a plugin which allows you to add some tips, easily!

## Usage:

Initialise Tip:

    <script>
    $(document).ready(function(){
      $('[data-tip]').tip({
        delay: 0,
        margin: 2,
        html: "My HTML content" // Don't set this option if you want to get data-tip attribute on each nodes
      });
    });
    </script>
