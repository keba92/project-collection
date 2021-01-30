const LightTheme = () => {
  const last = document.head.lastChild;
  if (last.className == 'theme-head') {
    document.head.removeChild(last);
  }
  const style = document.createElement('style');
  style.setAttribute('class', 'theme-head');
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
          background-color: #f9f9f9;
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
          background-color: #f9f9f9;
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
          text-decoration: none;
          color: rgb(0, 0, 0);
          text-align: center;
          background-color: #5f7d9c;
      }

      .table-items .card a {
          margin: 0;
          min-width: 100%;
      }

      a:hover {
          background: #2099f5;
          -webkit-transition: all 0.3s ease;;
          transition: all 0.3s ease;
      }
        
      .comment-box {
          border-radius: 3px;
          width: 85%;
          margin: 15px;
          padding: 20px;
          background-color: #d4e3ec;
          box-shadow: 0 14px 28px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.2);
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
          max-height: 30px;
          margin-bottom: 8px;
          color: rgb(151, 13, 13);
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: #000000;
      }
        
      h4 {
           text-align: center;
           color: #2b2e2d;
      }

      h1 {
          text-align: center;
          margin-top: 2%;
          margin-bottom: 2%;
          color: #2b2e2d;
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
          background-color: #d4e3ec;
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

      .tag-cloud span p {
            text-shadow: 0px 0px 2px rgba(150, 150, 150, 1);
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
        background-color: #9fa293;
        height: 100%;
        color: #2b2e2d;
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
        background-color: #91bfbf;
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
        background-color: #d4e3ec;
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
        background-color: #d4e3ec;
      }

      .flex-button {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
      }

      .nav {
        background-color: #0d6efd;
      }

      .nav:hover {
        background-color: #0d9dfd;
      }

      .navMenu {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .footer {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-flow: column;
            flex-flow: column;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        background-color: #191919;
        color: #78dde2;
        height: 20%;
        padding: 10px;
      }
    `;
};

export default LightTheme;
