const cardContainer = document.getElementById('card-container');
const detailContainer = document.getElementById('detail-container')
let allData = [];

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-section").classList.add("hidden");
    } else {
        document.getElementById("card-section").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};

const loadCardDetail = (id, labelHTML, badge) => {

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    fetch(url)
        .then(response => response.json())
        .then(Data => displayCardDetails(Data.data, labelHTML, badge));

};


const displayCardDetails = (data, labelHTML, badge) => {

    detailContainer.innerHTML = `
    
        <h3 class="text-[24px] text-[#1F2937] font-bold mb-[8px]">
            ${data.title}
        </h3>

        <div class="flex items-center gap-3  mb-[24px]">
        <span class="font-medium text-[12px] text-white bg-[#00A96E] py-[2px] px-[12px] rounded-full">
            ${data.status}ed
        </span>

        <span class="text-[12px] text-[#64748B]">
            Opened by ${data.assignee}
        </span>

        <span class="text-[12px] text-[#64748B]">
            ${data.updatedAt}
        </span>
        </div>

        <div class="mb-[16px] flex flex-wrap gap-3">
            ${labelHTML}
        </div>

        <p class="text-[#64748B] mb-[24px]">
            ${data.description}
        </p>

        <div class="grid grid-cols-2">

            <div>
                <p class="text-[#64748B]">Assignee:</p>
                <h2 class="font-semibold text-[#1F2937]">
                    ${data.assignee}
                </h2>
            </div>

            <div>
                <p class="text-[#64748B]">Priority:</p>

                <span class="font-medium text-[12px] ${badge} py-1 px-5 rounded-full">
                    ${data.priority.toUpperCase()}
                </span>

            </div>

        </div>
    `;

    my_modal_5.showModal();
};

// const loadCardDetail = (id, icon, labelHTML, badge) => {
//     const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(Data => displayCardDetails(Data.data, icon, labelHTML , badge));
// };


// const displayCardDetails = (data , icon, labelHTML , badge => {

//     detailContainer.innerHTML = `
//         <h3 class="text-[24px] text-[#1F2937] font-bold mb-[8px]">${data.title}</h3>
//             <span class="font-medium text-[12px] text-white bg-[#00A96E] py-[6px] px-[8px] rounded-xl">${data.status}</span>
//             <span class="text-[12px] text-[#64748B]">Opened by ${data.assignee}</span>
//             <span class="text-[12px] text-[#64748B]">${data.updatedAt}</span>

//             <div class="mb-[16px] flex flex-wrap gap-3">
//                 ${labelHTML}
//             </div>
//             <p class="text-[#64748B] mb-[24px]">${data.description}</p>
//             <div class="">
//                 <div class="">
//                     <p class="text-[#64748B]">Assignee:</p>
//                     <h2 class="font-semibold text-[#1F2937]">${data.assignee}</h2>
//                 </div>
//                 <div class="">
//                     <p class="text-[#64748B]">Priority:</p>
//                     <div>
//                         <span
//                             class="font-medium text-[12px] ${badge} py-1 px-5 rounded-full">${element.priority.toUpperCase()}</span>
//                     </div>
//                 </div>
//             </div>
//     `
//     my_modal_5.showModal();

// });

const loadCards = () => {
    manageSpinner(true);
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(response => response.json())
        .then(Data => {
            allData = Data.data;
            displayCard(Data.data);
        });
};

const displayCard = (Data) => {
    cardContainer.innerHTML = '';

    Data.forEach(element => {

        let borderColor = '';
        let badgeClass = '';

        if (element.priority === 'high') {
            badgeClass = 'text-[#EF4444] bg-[#FEECEC]';
        }
        else if (element.priority === 'medium') {
            badgeClass = 'text-[#F59E0B] bg-[#FFF6D1]';
        }
        else {
            badgeClass = 'text-[#9CA3AF] bg-[#EEEFF2]';
        }

        // For Border color
        if (element.status === 'open') {
            borderColor = "border-[#00A96E]"
        }
        else {
            borderColor = "border-[#A855F7]"
        }

        let statusIcon = '';

        if (element.status === 'open') {
            statusIcon = `<img src="./assets/Open-Status.png" alt="">`;
        }
        else {
            statusIcon = `<img src="./assets/Closed- Status .png" alt="">`;
        }

        const labelStyles = {
            bug: "text-[#EF4444] border border-[#FECACA] bg-[#FEECEC]",
            "help wanted": "text-[#D97706] border border-[#FDE68A] bg-[#FFF8DB]",
            enhancement: "text-[#00A96E] border border-[#BBF7D0] bg-[#DEFCE8]",
            documentation: "text-[#00A96E] border border-[#BBF7D0] bg-[#DEFCE8]",
            "good first issue": "text-[#EF4444] border border-[#FECACA] bg-[#FEECEC]"
        };

        let labelHTML = '';

        element.labels.forEach(label => {
            let icon = '';

            if (label === 'bug') icon = 'fa-bug';
            if (label === 'help wanted') icon = 'fa-location-crosshairs';
            if (label === 'enhancement') icon = 'fa-star';
            if (label === 'documentation') icon = 'fa-clipboard';
            if (label === 'good first issue') icon = 'fa-circle-exclamation';

            const labelName = label.toUpperCase();
            labelHTML += `
                <span
                    class="font-medium text-[12px] ${labelStyles[label]} py-1 px-5 rounded-full"><i
                    class="fa-solid ${icon}"></i> ${labelName}</span>
            `
        });


        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
            <div class="card shadow-[0_5px_20px_rgba(0,0,0,0.08)] p-[16px] ${borderColor}   border-t-4 border-l-0 border-b-0 border-r-0 h-full onclick('my_modal_3.showModal()')">
                    <div class="">
                        <div class="flex justify-between mb-[12px]">
                            <div class="">
                                ${statusIcon}
                            </div>
                            <div>
                                <span
                                    class="font-medium text-[12px] ${badgeClass} py-1 px-5 rounded-full">${element.priority.toUpperCase()}</span>
                            </div>
                        </div>


                        <div>
                            <h2 class="font-semibold text-[14px] text-[#1F2937] mb-[8px]">${element.title}</h2>
                            <p class="text-[12px] text-[#64748B] mb-[12px]">${element.description}</p>
                            <div class="mb-[16px] flex flex-wrap gap-3">
                                ${labelHTML}
                            </div>
                        </div>
                    </div>

                    <div class="border border-b-gray-300 border-t-0 border-l-0 border-r-0"></div>

                    <div class="p-[16px]">
                        <p class="text-[12px] text-[#64748B]">#${element.id} by ${element.author}</p>
                        <p class="text-[12px] text-[#64748B]">${element.createdAt}</p>
                    </div>
                </div>
        `
        cardContainer.appendChild(cardDiv);
        cardDiv.addEventListener('click', () => {
            loadCardDetail(element.id , labelHTML , badgeClass);
        });

    });

    manageSpinner(false);
    totalIssues();
};



document.getElementById('btn-open').addEventListener('click', () => {
    manageSpinner(true);
    const openData = allData.filter(el => el.status === 'open');
    displayCard(openData);
});

document.getElementById('btn-closed').addEventListener('click', () => {
    manageSpinner(true);
    const closeData = allData.filter(el => el.status === 'closed');
    displayCard(closeData);
});




loadCards();


const totalIssues = () => {
    const totalCard = cardContainer.children.length;
    let card = document.getElementById('total-card').innerText = totalCard;
};

const btnActive = (id) => {
    const buttonActive = document.querySelectorAll('.btn');
    console.log(buttonActive);

    buttonActive.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    const target = document.getElementById(id);
    target.classList.add('btn-active');
}


