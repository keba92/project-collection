const DarkTheme = () => {
    const last = document.head.lastChild;
    if (last.className == 'theme-head') {
      document.head.removeChild(last);
    } 
    const style = document.createElement('style');
    style.setAttribute('class', 'theme-head')
    document.head.appendChild(style);
    style.innerHTML = `

        html, body {
          width: 100%;
          height: 100%;
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
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                    justify-content: space-between;
            height: 5%;
            box-shadow: 0px 3px 4px 0px rgba(0,0,0,0.75);
            background-color: #191919;
          }
          
          .search-block {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            margin-right: 1%;
          }

          edit-item {
            min-height: 100%;
          }

          .button-main {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                    justify-content: space-between;
            background-color: #0b2937;
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
                    
          .user-img {
            max-width: 30px;
          }
          
          .create {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
          }
          
          .table-items {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            margin-top: 20px;
          }
          
          .card{
            margin: 2%;
            min-width: 7%;
            background-color: #0b2937;
            box-shadow: 0 14px 28px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.2);
          }

          .card:hover {
              -webkit-transform: scale(1.03);
              transform: scale(1.03);
              -webkit-transition: 0.5s;
              transition: 0.5s;
          }
          
          .table-collection {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            margin-top: 20px;
          }
          
          form {
            border-radius: 3px;
            margin: 10px;
            padding: 15px;
            min-width: 350px;
            background-color: #0b2937;
            box-shadow: 0 14px 28px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.2);
          }
          
          span i {
            margin-bottom: 10px;
            margin-right: 30px;
            cursor: pointer;
            float: right;
          }
          
          a {
            margin-left: 1%;
            padding: 3px;
            border-radius: 3px;
            text-decoration: none;
            color: rgb(0, 0, 0);
            text-align: center;
            background-color: rgb(41, 178, 128);
          }

          .table-items .card a {
            margin: 0;
            min-width: 100%;
          }

          a:hover {
            background: #1ff6c8;
            -webkit-transition: all 0.3s ease;;
            transition: all 0.3s ease;
          }
          
          .comment-box {
            border-radius: 3px;
            width: 85%;
            margin: 15px;
            padding: 20px;
            background-color: #0b2937;
            box-shadow: 0 14px 28px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.2);
            color: #0b2937;
          }
          
          .comment-body {
            border: 1px solid rgb(7, 7, 7);
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
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-flow: column;
                flex-flow: column;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
          }
          
          .users {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
                -ms-flex-direction: column;
                    flex-direction: column;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            height: 100%;
          }
          
          .table-dark {
            max-width: 85% !important;
            table-layout: auto;
          }
          
          th, td {
            border: 1px solid black;
            padding: 10px;
          }
          
          .toolBar {
            display: inline;
           }
          
          .back {
            margin-left: 20px;
            margin-bottom: 20px;
            color: rgb(151, 13, 13);
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #000000;
          }
          
           h4 {
             text-align: center;
             color: #f7f7d8;
           }

           h1 {
            text-align: center;
            margin-top: 2%;
            margin-bottom: 2%;
            color: #f7f7d8;
          }
          
           .user-name {
             padding-left: 10px;
             font-weight: bold;
           }
          
          .cloud-div {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-flow: column;
                flex-flow: column;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            background-color: #0b2937;
            box-shadow:         0px 4px 2px 0px rgba(50, 50, 50, 0.5);
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

           .tag-cloud span:hover {
            -webkit-transform: scale(1.08);
            transform: scale(1.08);
            -webkit-transition: 0.5s;
            transition: 0.5s;
           }

           select {
             background-color: white;
             color: black;
           }

          .dropzone {
            height: 64px;
            height: 4rem;
            margin: 16px;
            margin: 1rem;
            padding: 16px;
            padding: 1rem;
            border: 1px dashed salmon;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            font-size: 16px;
            font-size: 1rem;
            cursor: pointer;
        }

        .active {
            border: 2px solid rebeccapurple;
        }

        .body-page {
          background-color: #1e656a;
          min-width: 100%;
          min-height: 100%;
          color: #f7f7d8;
        }

        .big-collect {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-flow: column;
              flex-flow: column;
          -webkit-box-align: center;
              -ms-flex-align: center;
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
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          -ms-flex-flow: column;
              flex-flow: column;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          background-color: #094f58;
          box-shadow: 0 14px 28px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.2);
        }

        .filterBox {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          padding-bottom: 3%;
        }

        .result-search {
          background-color: #0b2937;
        }

        .flex-button {
          display: flex;
          flex-wrap: wrap;
          justify-content: start;
        }
        `
    
}

export default DarkTheme;