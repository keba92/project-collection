const DarkTheme = () => {
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
            color: white;
        }
        
        body {
            background-color:rgb(59, 59, 59);
        }
        
        .header{
            display: flex;
            justify-content: space-between;
            height: 60px;
            width: 100%;
            border-bottom: 2px solid gray;
            background-color: rgb(104, 104, 104);
        }
        
        .search-block {
            display: flex;
            margin-top: 10px;
            margin-left: 1.5%;
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
            margin-right: 1%;
            margin-left: 1%;
            margin-bottom: 1%;
            min-width: 7%;
            background-color: rgb(26, 25, 25);
            border: 1px solid gray;
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
        }
        
        span i {
            margin-bottom: 10px;
            margin-right: 30px;
            cursor: pointer;
            float: right;
        }
        
        a {
            margin-left: 5px;
            margin-top: 10px;
            margin-bottom: 10px;
            max-width: 50%;
            padding-left: 5px;
            padding-right: 5px;
            border: 1px solid rgb(207, 207, 207);
            border-radius: 3px;
            text-decoration: none;
            color: rgb(0, 0, 0);
            text-align: center;
            background-color: rgb(253, 238, 154);
        }
        
        .comment-box {
            border: 3px solid rgb(5, 5, 5);
            border-radius: 3px;
            max-width: 650px;
            margin: 15px;
            padding: 20px;
            background-color: rgb(44, 44, 44);
        }
        
        .comment-body {
            border: 2px solid rgb(7, 7, 7);
            border-radius: 3px;
            max-width: 600px;
            padding: 7px;
            background-color: rgb(73, 73, 73);
        }
        
        .comment {
            border: 1px solid rgb(158, 157, 157);
            border-radius: 3px;
            max-width: 350px;
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
        }
        
        table {
            border-collapse: collapse;
            width: 80%;
            overflow: scroll;
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
        }

        h3 {
            text-align: center;
          }
        
        .user-name {
            padding-left: 10px;
            font-weight: bold;
        }
        
        .cloud-div {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
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

        message-block {
            background-color: white;
            color: black;
        }

        option {
            color: black;
        }

        div tags input {
            color: black;
        }

        .tagify__input {
            background-color: white;
        }

        `
    
}

export default DarkTheme;