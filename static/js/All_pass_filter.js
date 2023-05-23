const allPassPhase = document.getElementById('filteredphaseres');
const checkList = document.getElementById('apflist');

layout = {
        paper_bgcolor:"#efefef",
        plot_bgcolor:"#efefef",
        autosize: false,
        width:600,
        height:250,

        margin: {
          l: 40,
          r: 0,
          b: 20,
          t: 10,
          pad: 0
        }
}

//initialize
Plotly.newPlot(
    allPassPhase,
    [{x: [], y: []}],layout, { staticPlot: true })

    



function opentab() {
    document.getElementById("myNav").style.height = "90%";
  }
  
  function closetab() {
    document.getElementById("myNav").style.height = "0%";
  }


function opentab() {
    document.getElementById("myNav").style.height = "90%";
  }
  
  function closetab() {
    document.getElementById("myNav").style.height = "0%";
  }


var swiper = new Swiper('.swiper-container', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 5,
    spaceBetween: 10,
    autoplayDisableOnInteraction: false,
    loop: true,
    breakpoints: {
    1024: {
        slidesPerView: 3,
        spaceBetween: 40
    },
    768: {
        slidesPerView: 3,
        spaceBetween: 30
    },
    640: {
        slidesPerView: 2,
        spaceBetween: 20
    },
    320: {
        slidesPerView: 1,
        spaceBetween: 10
    }
    }
    });

const real=document.querySelector('#real')
const imaginary=document.querySelector('#imaginary')
const list = document.querySelector("#list")



function addItem(a,n){

    let x,y;

    if(n==1){
        if((real.value=="" || imaginary.value=="" )||(parseFloat(real.value)==0 && parseFloat(imaginary.value)==0) ){
            return}
        else{
         x=real.value;
         y=imaginary.value;}
        }
    if(n==0) {
        x=a[0];
        y=a[1];}    

    var newA = math.complex(a[0], a[1])    
    const myli = document.createElement('li');
    myli.innerHTML =" a = " + x + " + j " + y ;
    list.appendChild(myli);
    const span = document.createElement('span');
    span.innerHTML = '×';
    myli.appendChild(span);
    
    const close = document.querySelectorAll('span');
    const txt = document.querySelectorAll('li');

    real.value="";
    imaginary.value = "";
    applyAPF([x,y]);
}

async function updateFilterPhase(allPassCoeff){
    const { zeros, poles } = filter_plane.getZerosPoles(radius)
    const { angels: allPassAngels } = await postData(
        'http://127.0.0.1:8000//getAllPassFilter',
        {
            zero,
            poles,
            a: allPassCoeff,
        }
    )

    Plotly.newPlot(
        allPassPhase,
        [{x: w, y: allPassAngels}],layout, { staticPlot: true })
    }

    function updateAllPassCoeff(){
        let allPassCoeff = []
        document.querySelectorAll('.target1').forEach(item => {
            let aValue = (item.dataset.avalue)
            console.log(aValue)
            let checked = item.checked
            if (checked) allPassCoeff.push(aValue)
        })
        updateFilterPhase(allPassCoeff)
    }