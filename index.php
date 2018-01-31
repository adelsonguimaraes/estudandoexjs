<?php $api="./api";?>

<!DOCTYPE html>
<html>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Style Neptune ExtJs -->
    <link rel="stylesheet" type="text/css" href="<?php echo $api?>/libs/ext/resources/ext-theme-neptune/ext-theme-neptune-all.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $api?>/libs/css/app.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $api?>/libs/css/style.css">
    <link rel="stylesheet" href="<?php echo $api?>/libs/font-awesome/css/font-awesome.min.css">
    <link rel="shortcut icon" href="favicon.ico">

    <style type="text/css">
        .float-logo {
            background: url('<?php echo $api?>/img/logosolverp.jpg') no-repeat;
            background-size: 140px;
            background-position: 50%;
            background-position-x: -25%;
            background-position-y: 125%;
            /*border: 1px solid;*/
            height: 120px;
            width: 120px;
            padding: 10px;
            border-radius:50px;
            margin: 0 auto;
            position: fixed;
            right: 1%;
             /* top: 1%;   */
            bottom: 6%;  
            z-index: 1050;
            color: black;
        }
    </style>

</head>
<title>Estudando ExtJs</title>
<body>  <!-- onKeyPress="press(event.keyCode)" onKeyUp="press(event.keyCode)"> -->
<!-- <div class="float-logo"></div> -->
</body>
	
<script type="text/javascript"> var api = "./api"; </script>
<!-- ExtJs -->
	<script type="text/javascript" src="<?php echo $api?>/libs/ext/ext-all-dev.js"></script>
	<!-- Linguagem -->
    <script type="text/javascript" src="<?php echo $api?>/libs/ext/locale/ext-lang-pt_BR.js"></script>
    <!-- AppJS -->
	<script type="text/javascript" src="app.js"></script>

    <script type="text/javascript" src="app/util/moment/moment.min.js"></script>

    <script type="text/javascript">
        function press( key ) {
            if ( Ext.ComponentQuery.query('mainviewport').length > 0) {
                console.log( key );
            }
        }
        function up () {
            if ( Ext.ComponentQuery.query('mainviewport').length > 0) {

            }
        }
    </script>

</html>