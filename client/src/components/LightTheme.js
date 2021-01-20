const LightTheme = () => {
    const last = document.head.lastChild;
    if (last.className == 'theme-head') {
        document.head.removeChild(last);
    } 
        const style = document.createElement('style');
        style.setAttribute('class', 'theme-head')
        document.head.appendChild(style);
        style.innerHTML = `
        @media (min-width:600px){
          .user-name{
              display:none;
          }
        }

        .fa-sun-o .fa-moon-o {
          width: 50px;
          margin-left: 10px;
        }

        * {
            margin: 0;
            padding: 0;
          }
          
          .header{
            display: flex;
            justify-content: space-between;
            height: 5%;
            -webkit-box-shadow: 0px 3px 4px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 3px 4px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 3px 4px 0px rgba(0,0,0,0.75);
            background-color: #191919;
          }
          
          .search-block {
            display: flex;
            margin-left: 1.5%;
          }

          .button-main {
            display: flex;
            position: sticky;
            top: 0;
            justify-content: space-between;
            background-color: #d4e3ec;
            padding-top: 15px;
            z-index: 100;
          }
          
          .input-search {
            height: 35px;
          }
          
          .log-block {
            float: right;
            padding-top: 10px;
            padding-bottom: 10px;
            margin-right: 3%;
          }
          
          button {
            height: 35px;
            width: 90px;
            background-color: rgb(163, 162, 162);
            margin-right: 10px;
            cursor: pointer;
          }
          
          .user-img {
            max-width: 30px;
          }
          
          .create {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .table-items {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 20px;
          }
          
          .card{
            margin: 2%;
            min-width: 7%;
            background-color: #e4dece;
            box-shadow: 0 14px 28px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.2);
            color: #0b2937;
          }
          
          .table-collection {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 20px;
          }
          
          form {
            border: 1px solid rgb(190, 190, 190);
            border-radius: 3px;
            margin: 10px;
            padding: 15px;
            min-width: 350px;
            color: #0b2937;
            background-color: #e4dece;
            box-shadow: 0 14px 28px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.2);
          }
          
          span i {
            margin-bottom: 10px;
            margin-right: 30px;
            cursor: pointer;
            float: right;
          }
          
          a {
            margin: 10px
            max-width: 50%;
            padding: 5px;
            border: 1px solid rgb(207, 207, 207);
            border-radius: 3px;
            text-decoration: none;
            color: rgb(0, 0, 0);
            text-align: center;
            background-color: #5f7d9c;
          }
          
          .comment-box {
            border: 0px solid rgb(5, 5, 5);
            border-radius: 3px;
            width: 50%;
            margin: 15px;
            padding: 20px;
            background-color: #d4e3ec;
            box-shadow: 0 14px 28px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.2);
          }
          
          .comment-body {
            border: 2px solid rgb(7, 7, 7);
            border-radius: 3px;
            max-width: 97%;
            padding: 7px;
            background-color: #f7f7d8;
          }
          
          .comment {
            border: 1px solid rgb(158, 157, 157);
            border-radius: 3px;
            max-width: 97%;
            margin-bottom: 3px;
            padding: 5px;
          }
          
          .content-item {
            display: flex;
            flex-flow: column;
            align-items: center;
          }
          
          .users {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 10%;
            overflow: scroll;
          }
          
          table {
            border-collapse: collapse;
          }
          
          th, td {
            border: 1px solid black;
            padding: 10px
          }
          
          .toolBar {
            display: inline
           }
          
           .back {
              margin-top: 20px;
              margin-left: 20px;
              margin-bottom: 20px;
             color: rgb(151, 13, 13);
             -webkit-text-stroke-width: 1px;
             -webkit-text-stroke-color: #000000;
           }
          
           h4 {
             text-align: center;
             color: #2e545b;
           }

           h1 {
            text-align: center;
            margin-top: 2%;
            margin-bottom: 2%;
            color: #2e545b;
            text-shadow: 1px 1px 2px rgba(150, 150, 150, 1);
          }
          
           .user-name {
             padding-left: 10px;
             font-weight: bold;
           }
          
          .cloud-div {
            display: flex;
            flex-flow: column;
            align-items: center;
            background-color: #d4e3ec;
            padding-bottom: 3%;
            box-shadow: 0 3px 2px rgba(0,0,0,0.2), 0 3px 2px rgba(0,0,0,0.2);
          }
          
           .lang {
             margin-top: 1%;
             margin-left: 10px;
             border-radius: 2px;
             cursor: pointer;
           }
           
           span .tagify__input {
             background-color: white;
           }

           select {
             background-color: white;
             color: black;
           }

           .dropzone {
            height: 4rem;
            margin: 1rem;
            padding: 1rem;
            border: 1px dashed salmon;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            cursor: pointer;
        }

        .active {
            border: 2px solid rebeccapurple;
        }

        .body-page {
          background-color: #91bfbf;
          min-height: 100%;
        }

        .big-collect {
          display: flex;
          flex-flow: column;
          align-items: center;
          background-color: #3892b7;
          box-shadow: 0 14px 28px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.2);
        }
        
        .btn-primary {
          margin: 10px;
        }

        .filter {
          margin: 0 auto;
          margin-top: 20px;
          display: flex;
          width: 100%;
          flex-flow: column;
          align-items: center;
          background-color: #d4e3ec;
          box-shadow: 0 14px 28px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.2);
        }

        .filterBox {
          display: flex;
          justify-content: center;
          padding-bottom: 3%;
        }
           
        `
}

export default LightTheme;