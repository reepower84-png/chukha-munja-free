// ===== 상태 관리 =====
let currentStep = 1;
let currentEventType = 'wedding';

// ===== 이벤트 타입별 설정 =====
const EVENT_CONFIG = {
    wedding: {
        label: '결혼식',
        icon: '💍',
        title: '청 첩 장',
        closing: '두 사람의 앞날을 축복해 주세요',
        subjectTitle: '신랑·신부 정보',
        venueTitle: '예식 정보',
        venueLabel: '예식장',
        venueRoomLabel: '홀·층',
        dateLabel: '예식 날짜',
        timeLabel: '예식 시간',
        afterParty: true,
        accountCardTitle: '마음 전하는 곳',
        accountCardDesc: '축의금을 보내실 분들을 위한 계좌 정보입니다.',
        defaultRibbon: '祝 結婚'
    },
    dol: {
        label: '돌잔치',
        icon: '🎂',
        title: '돌잔치 초대',
        closing: '아이의 첫 생일을 축복해 주세요',
        subjectTitle: '아기 정보',
        venueTitle: '돌잔치 정보',
        venueLabel: '행사 장소',
        venueRoomLabel: '홀·룸',
        dateLabel: '행사 날짜',
        timeLabel: '행사 시간',
        afterParty: false,
        accountCardTitle: '마음 전하는 곳',
        accountCardDesc: '축하금을 보내실 분들을 위한 계좌 정보입니다.',
        defaultRibbon: '祝 生日'
    },
    hwangap: {
        label: '회갑 (환갑)',
        icon: '🎊',
        title: '회 갑 연',
        closing: '귀한 걸음으로 자리를 빛내 주세요',
        subjectTitle: '회갑 주인공 정보',
        venueTitle: '회갑연 정보',
        venueLabel: '행사 장소',
        venueRoomLabel: '홀·층',
        dateLabel: '행사 날짜',
        timeLabel: '행사 시간',
        afterParty: false,
        accountCardTitle: '마음 전하는 곳',
        accountCardDesc: '축하금을 보내실 분들을 위한 계좌 정보입니다.',
        defaultRibbon: '祝 回甲'
    },
    chilsun: {
        label: '칠순 (고희)',
        icon: '🌸',
        title: '칠 순 연',
        closing: '귀한 걸음으로 자리를 빛내 주세요',
        subjectTitle: '칠순 주인공 정보',
        venueTitle: '칠순연 정보',
        venueLabel: '행사 장소',
        venueRoomLabel: '홀·층',
        dateLabel: '행사 날짜',
        timeLabel: '행사 시간',
        afterParty: false,
        accountCardTitle: '마음 전하는 곳',
        accountCardDesc: '축하금을 보내실 분들을 위한 계좌 정보입니다.',
        defaultRibbon: '祝 古稀'
    },
    palsun: {
        label: '팔순',
        icon: '🌺',
        title: '팔 순 연',
        closing: '귀한 걸음으로 자리를 빛내 주세요',
        subjectTitle: '팔순 주인공 정보',
        venueTitle: '팔순연 정보',
        venueLabel: '행사 장소',
        venueRoomLabel: '홀·층',
        dateLabel: '행사 날짜',
        timeLabel: '행사 시간',
        afterParty: false,
        accountCardTitle: '마음 전하는 곳',
        accountCardDesc: '축하금을 보내실 분들을 위한 계좌 정보입니다.',
        defaultRibbon: '祝 八旬'
    },
    opening: {
        label: '개업·오픈',
        icon: '🎀',
        title: '개 업 식',
        closing: '축복된 걸음으로 함께해 주세요',
        subjectTitle: '상호 정보',
        venueTitle: '개업 장소 정보',
        venueLabel: '매장·사업장',
        venueRoomLabel: '층·호',
        dateLabel: '개업 날짜',
        timeLabel: '개업 시간',
        afterParty: false,
        accountCardTitle: '화환·축하금 계좌',
        accountCardDesc: '축하금을 보내실 분들을 위한 계좌 정보입니다.',
        defaultRibbon: '祝 開業'
    }
};

// ===== 이벤트 타입별 계좌 관계 옵션 =====
const RELATION_OPTIONS = {
    wedding: `
        <option value="">선택</option>
        <optgroup label="신랑측">
            <option value="신랑">신랑</option>
            <option value="신랑 아버지">신랑 아버지</option>
            <option value="신랑 어머니">신랑 어머니</option>
            <option value="장남">장남</option>
            <option value="차남">차남</option>
            <option value="삼남">삼남</option>
            <option value="아들">아들</option>
        </optgroup>
        <optgroup label="신부측">
            <option value="신부">신부</option>
            <option value="신부 아버지">신부 아버지</option>
            <option value="신부 어머니">신부 어머니</option>
            <option value="장녀">장녀</option>
            <option value="차녀">차녀</option>
            <option value="삼녀">삼녀</option>
            <option value="딸">딸</option>
        </optgroup>
        <option value="__custom__">직접입력</option>
    `,
    dol: `
        <option value="">선택</option>
        <option value="아버지">아버지</option>
        <option value="어머니">어머니</option>
        <option value="친할아버지">친할아버지</option>
        <option value="친할머니">친할머니</option>
        <option value="외할아버지">외할아버지</option>
        <option value="외할머니">외할머니</option>
        <option value="큰아버지">큰아버지</option>
        <option value="큰어머니">큰어머니</option>
        <option value="작은아버지">작은아버지</option>
        <option value="작은어머니">작은어머니</option>
        <option value="이모">이모</option>
        <option value="고모">고모</option>
        <option value="__custom__">직접입력</option>
    `,
    elder: `
        <option value="">선택</option>
        <option value="본인">본인</option>
        <option value="배우자">배우자</option>
        <optgroup label="자녀">
            <option value="장남">장남</option>
            <option value="차남">차남</option>
            <option value="삼남">삼남</option>
            <option value="아들">아들</option>
            <option value="장녀">장녀</option>
            <option value="차녀">차녀</option>
            <option value="삼녀">삼녀</option>
            <option value="딸">딸</option>
        </optgroup>
        <optgroup label="가족">
            <option value="며느리">며느리</option>
            <option value="사위">사위</option>
            <option value="손자">손자</option>
            <option value="손녀">손녀</option>
        </optgroup>
        <option value="__custom__">직접입력</option>
    `,
    opening: `
        <option value="">선택</option>
        <option value="대표">대표</option>
        <option value="공동대표">공동대표</option>
        <option value="사업주">사업주</option>
        <option value="임직원">임직원</option>
        <option value="법인계좌">법인계좌</option>
        <option value="__custom__">직접입력</option>
    `
};

function getRelationOptionsHTML(type) {
    if (type === 'wedding') return RELATION_OPTIONS.wedding;
    if (type === 'dol') return RELATION_OPTIONS.dol;
    if (type === 'hwangap' || type === 'chilsun' || type === 'palsun') return RELATION_OPTIONS.elder;
    if (type === 'opening') return RELATION_OPTIONS.opening;
    return RELATION_OPTIONS.wedding;
}

function refreshAccountRelationSelects(type) {
    const html = getRelationOptionsHTML(type);
    document.querySelectorAll('.account-relation-group').forEach(group => {
        const sel = group.querySelector('.accountRelation');
        if (!sel) return;
        const prev = sel.value;
        sel.innerHTML = html;
        if ([...sel.options].some(o => o.value === prev && prev)) {
            sel.value = prev;
        } else {
            sel.value = '';
            const custom = group.querySelector('.accountRelationCustom');
            if (custom) { custom.style.display = 'none'; custom.value = ''; }
        }
    });
}

// ===== 텔레그램 알림 =====
const TELEGRAM_BOT_TOKEN = '8124413385:AAHY7vYtJwHIt2eJ2bb9YdES6-NUrHlTCYk';
const TELEGRAM_CHAT_ID = '5454616674';

async function sendTelegramNotification(message) {
    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
    } catch (e) {
        // 알림 실패해도 무시
    }
}

function sendDiscordNotification(embed) {
    let msg = `<b>${embed.title || ''}</b>\n\n`;
    if (embed.fields) {
        embed.fields.forEach(f => {
            msg += `<b>${f.name}:</b> ${f.value}\n`;
        });
    }
    msg += `\n— 축하문자무료발송`;
    sendTelegramNotification(msg);
}

// ===== 이벤트 타입 선택 =====
function selectEventType(type) {
    currentEventType = type;
    const config = EVENT_CONFIG[type];

    document.querySelectorAll('.event-type-item').forEach(el => {
        el.classList.toggle('selected', el.dataset.type === type);
    });

    // 주인공 정보 블록 전환
    document.getElementById('subjectWedding').style.display = type === 'wedding' ? 'block' : 'none';
    document.getElementById('subjectDol').style.display = type === 'dol' ? 'block' : 'none';
    document.getElementById('subjectElder').style.display = (type === 'hwangap' || type === 'chilsun' || type === 'palsun') ? 'block' : 'none';
    document.getElementById('subjectOpening').style.display = type === 'opening' ? 'block' : 'none';

    // 카드 타이틀 업데이트
    document.getElementById('subjectCardTitle').textContent = config.subjectTitle;
    document.getElementById('venueCardTitle').textContent = config.venueTitle;
    document.getElementById('venueNameLabel').innerHTML = config.venueLabel + ' <span class="required">*</span>';
    document.getElementById('venueRoomLabel').textContent = config.venueRoomLabel;
    document.getElementById('eventDateLabel').innerHTML = config.dateLabel + ' <span class="required">*</span>';
    document.getElementById('eventTimeLabel').textContent = config.timeLabel;

    // 주소·연락처 라벨 (이벤트 타입별)
    const addrPrefix = type === 'wedding' ? '예식장' : '행사장';
    document.getElementById('venueAddressLabel').textContent = `${addrPrefix} 주소 (입력 시 지도 길찾기 기능이 활성화됩니다.)`;
    document.getElementById('venuePhoneLabel').textContent = `${addrPrefix} 연락처`;

    // 피로연 표시/숨김
    document.getElementById('afterPartyGroup').style.display = config.afterParty ? 'block' : 'none';

    // 계좌 카드 업데이트
    document.getElementById('accountCardTitle').innerHTML = config.accountCardTitle + ' <span style="font-size:12px; font-weight:400; color:var(--text-muted);">(선택사항)</span>';
    document.getElementById('accountCardDesc').textContent = config.accountCardDesc;

    // 모든 이벤트 타입에서 관계 필드 표시, 옵션은 타입별 갱신
    document.querySelectorAll('.account-relation-group').forEach(el => {
        el.style.display = 'block';
    });
    refreshAccountRelationSelects(type);
}

// ===== 계좌 관계 직접입력 토글 =====
function toggleAccountRelationCustom(selectEl) {
    const item = selectEl.closest('.account-item');
    if (!item) return;
    const customInput = item.querySelector('.accountRelationCustom');
    if (!customInput) return;
    if (selectEl.value === '__custom__') {
        customInput.style.display = 'block';
        customInput.focus();
    } else {
        customInput.style.display = 'none';
        customInput.value = '';
    }
}

// ===== 스텝 이동 =====
function goToStep(step) {
    if (step === 2) {
        if (!validateStep1()) return;
        generatePreview();
    }
    if (step === 3) {
        generateShareData();
    }

    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');

    document.querySelectorAll('.step').forEach(s => {
        const sStep = parseInt(s.dataset.step);
        s.classList.remove('active', 'done');
        if (sStep === step) s.classList.add('active');
        else if (sStep < step) s.classList.add('done');
    });

    currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 유효성 검사 =====
function validateStep1() {
    const venueName = document.getElementById('venueName').value.trim();
    const date = document.getElementById('eventDate').value;

    // 주인공 검사 (타입별)
    if (currentEventType === 'wedding') {
        const groom = document.getElementById('groomName').value.trim();
        const bride = document.getElementById('brideName').value.trim();
        if (!groom) { showToast('신랑 성함을 입력해 주세요'); document.getElementById('groomName').focus(); return false; }
        if (!bride) { showToast('신부 성함을 입력해 주세요'); document.getElementById('brideName').focus(); return false; }
    } else if (currentEventType === 'dol') {
        const baby = document.getElementById('babyName').value.trim();
        if (!baby) { showToast('아기 성함을 입력해 주세요'); document.getElementById('babyName').focus(); return false; }
    } else if (currentEventType === 'hwangap' || currentEventType === 'chilsun' || currentEventType === 'palsun') {
        const elder = document.getElementById('elderName').value.trim();
        if (!elder) { showToast('주인공 성함을 입력해 주세요'); document.getElementById('elderName').focus(); return false; }
    } else if (currentEventType === 'opening') {
        const shop = document.getElementById('shopName').value.trim();
        if (!shop) { showToast('상호명을 입력해 주세요'); document.getElementById('shopName').focus(); return false; }
    }

    if (!venueName) {
        showToast(EVENT_CONFIG[currentEventType].venueLabel + '을(를) 입력해 주세요');
        document.getElementById('venueName').focus();
        return false;
    }
    if (!date) {
        showToast(EVENT_CONFIG[currentEventType].dateLabel + '을(를) 선택해 주세요');
        document.getElementById('eventDate').focus();
        return false;
    }
    return true;
}

// ===== 계좌 관리 =====
function getAccounts() {
    const items = document.querySelectorAll('.account-item');
    const accounts = [];
    items.forEach(item => {
        const bank = item.querySelector('.accountBank').value;
        const holder = item.querySelector('.accountHolder').value.trim();
        const number = item.querySelector('.accountNumber').value.trim();
        let relation = '';
        const relSel = item.querySelector('.accountRelation');
        if (relSel) {
            if (relSel.value === '__custom__') {
                const c = item.querySelector('.accountRelationCustom');
                relation = c ? c.value.trim() : '';
            } else {
                relation = relSel.value;
            }
        }
        if (bank && holder && number) {
            accounts.push({ bank, holder, number, relation });
        }
    });
    return accounts;
}

function addAccount() {
    const list = document.getElementById('accountList');
    const item = document.createElement('div');
    item.className = 'account-item';
    item.innerHTML = `
        <div class="form-group account-relation-group">
            <label>관계</label>
            <select class="accountRelation" onchange="toggleAccountRelationCustom(this)">${getRelationOptionsHTML(currentEventType)}</select>
            <input type="text" class="accountRelationCustom" placeholder="관계를 직접 입력하세요" style="display:none; margin-top:6px;">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>은행</label>
                <select class="accountBank">
                    <option value="">선택</option>
                    <option value="국민은행">국민은행</option>
                    <option value="신한은행">신한은행</option>
                    <option value="하나은행">하나은행</option>
                    <option value="우리은행">우리은행</option>
                    <option value="NH농협">NH농협</option>
                    <option value="IBK기업">IBK기업</option>
                    <option value="카카오뱅크">카카오뱅크</option>
                    <option value="토스뱅크">토스뱅크</option>
                    <option value="케이뱅크">케이뱅크</option>
                    <option value="SC제일">SC제일</option>
                    <option value="대구은행">대구은행</option>
                    <option value="부산은행">부산은행</option>
                    <option value="광주은행">광주은행</option>
                    <option value="경남은행">경남은행</option>
                    <option value="전북은행">전북은행</option>
                    <option value="제주은행">제주은행</option>
                    <option value="수협은행">수협은행</option>
                    <option value="우체국">우체국</option>
                    <option value="새마을금고">새마을금고</option>
                    <option value="신협">신협</option>
                </select>
            </div>
            <div class="form-group">
                <label>예금주</label>
                <input type="text" class="accountHolder" placeholder="예: 홍길동 (선택)">
            </div>
        </div>
        <div class="form-group">
            <label>계좌번호</label>
            <input type="text" class="accountNumber" placeholder="예: 123-456-789012 (선택)">
        </div>
        <button type="button" class="remove-btn" onclick="removeAccount(this)">삭제</button>
    `;
    list.appendChild(item);
}

function removeAccount(btn) {
    btn.closest('.account-item').remove();
}

// ===== 직접입력 토글 =====
function toggleCustomRelation(selectEl, customInputId) {
    const customInput = document.getElementById(customInputId);
    if (!customInput) return;
    if (selectEl.value === '__custom__') {
        customInput.style.display = 'block';
        customInput.focus();
    } else {
        customInput.style.display = 'none';
        customInput.value = '';
    }
}

function resolveCustomValue(selectId, customInputId) {
    const sel = document.getElementById(selectId);
    if (!sel) return '';
    if (sel.value === '__custom__') {
        const c = document.getElementById(customInputId);
        return c ? c.value.trim() : '';
    }
    return sel.value;
}

// ===== 데이터 수집 =====
function getFormData() {
    const base = {
        eventType: currentEventType,
        venueName: document.getElementById('venueName').value.trim(),
        venueRoom: document.getElementById('venueRoom').value.trim(),
        eventDate: document.getElementById('eventDate').value,
        eventTime: document.getElementById('eventTime').value,
        venueAddress: document.getElementById('venueAddress').value.trim(),
        venuePhone: document.getElementById('venuePhone').value.trim(),
        afterParty: document.getElementById('afterParty').value.trim(),
        messageStyle: document.getElementById('messageStyle').value,
        additionalMessage: document.getElementById('additionalMessage').value.trim(),
        accounts: getAccounts(),
    };

    if (currentEventType === 'wedding') {
        base.groomName = document.getElementById('groomName').value.trim();
        base.brideName = document.getElementById('brideName').value.trim();
        base.groomParents = document.getElementById('groomParents').value.trim();
        base.brideParents = document.getElementById('brideParents').value.trim();
        base.groomRelation = resolveCustomValue('groomRelation', 'groomRelationCustom');
        base.brideRelation = resolveCustomValue('brideRelation', 'brideRelationCustom');
    } else if (currentEventType === 'dol') {
        base.babyName = document.getElementById('babyName').value.trim();
        base.babyBirth = document.getElementById('babyBirth').value;
        base.babyGender = document.getElementById('babyGender').value;
        base.dolFather = document.getElementById('dolFather').value.trim();
        base.dolMother = document.getElementById('dolMother').value.trim();
    } else if (currentEventType === 'hwangap' || currentEventType === 'chilsun' || currentEventType === 'palsun') {
        base.elderName = document.getElementById('elderName').value.trim();
        base.elderAge = document.getElementById('elderAge').value.trim();
        base.elderGender = document.getElementById('elderGender').value;
        base.elderHosts = document.getElementById('elderHosts').value.trim();
    } else if (currentEventType === 'opening') {
        base.shopName = document.getElementById('shopName').value.trim();
        base.shopCeo = document.getElementById('shopCeo').value.trim();
        base.shopType = document.getElementById('shopType').value.trim();
    }

    return base;
}

// ===== 날짜/시간 포맷 =====
function formatDate(dateStr) {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekDay = weekDays[d.getDay()];
    return `${year}년 ${month}월 ${day}일(${weekDay})`;
}

function formatTime(timeStr) {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h);
    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${period} ${displayHour}시${m !== '00' ? ` ${m}분` : ''}`;
}

// ===== 이벤트 타입별 주인공 텍스트 =====
function getSubjectHeadline(data) {
    const type = data.eventType || 'wedding';
    if (type === 'wedding') {
        const gr = data.groomRelation ? `${data.groomRelation} ` : '';
        const br = data.brideRelation ? `${data.brideRelation} ` : '';
        return `${gr}${data.groomName} ♥ ${br}${data.brideName}`;
    }
    if (type === 'dol') {
        return `${data.babyName}${data.babyGender ? ' ' + data.babyGender : ''} 첫 번째 생일`;
    }
    if (type === 'hwangap') {
        const g = data.elderGender ? ` ${data.elderGender}` : '';
        return `${data.elderName}${g} 회갑연`;
    }
    if (type === 'chilsun') {
        const g = data.elderGender ? ` ${data.elderGender}` : '';
        return `${data.elderName}${g} 칠순연`;
    }
    if (type === 'palsun') {
        const g = data.elderGender ? ` ${data.elderGender}` : '';
        return `${data.elderName}${g} 팔순연`;
    }
    if (type === 'opening') {
        return `${data.shopName} 개업식`;
    }
    return '';
}

// ===== 메시지 생성 =====
function generateMessage(data, style) {
    const config = EVENT_CONFIG[data.eventType] || EVENT_CONFIG.wedding;
    const dateText = data.eventDate ? formatDate(data.eventDate) : '';
    const timeText = data.eventTime ? ` ${formatTime(data.eventTime)}` : '';
    const roomText = data.venueRoom ? ` ${data.venueRoom}` : '';
    const addressText = data.venueAddress ? `\n주  소: ${data.venueAddress}` : '';
    const phoneText = data.venuePhone ? `\n연락처: ${data.venuePhone}` : '';
    const afterPartyText = (config.afterParty && data.afterParty) ? `\n피로연: ${data.afterParty}` : '';
    const accountText = data.accounts && data.accounts.length > 0
        ? '\n\n[마음 전하는 곳]\n' + data.accounts.map(a => {
            const rel = a.relation ? `${a.relation} ` : '';
            return `${rel}${a.holder}\n${a.bank} ${a.number}`;
        }).join('\n\n')
        : '';
    const additional = data.additionalMessage ? '\n\n' + data.additionalMessage : '';

    // 이벤트 타입별 헤드라인
    let headline = '';
    let intro = '';

    if (data.eventType === 'wedding') {
        const gp = data.groomParents ? `${data.groomParents}의 ${data.groomRelation || '아들'}` : `${data.groomRelation || '아들'}`;
        const bp = data.brideParents ? `${data.brideParents}의 ${data.brideRelation || '딸'}` : `${data.brideRelation || '딸'}`;
        headline = `${data.groomName} ♥ ${data.brideName}`;
        if (style === 'formal') {
            intro = `${data.groomParents ? data.groomParents + '\n' : ''}${gp} ${data.groomName}\n${data.brideParents ? data.brideParents + '\n' : ''}${bp} ${data.brideName}\n\n두 사람이 사랑의 결실을 맺어\n부부의 연을 맺고자 합니다.\n\n귀한 걸음 하시어 축복해 주시면 감사하겠습니다.`;
        } else if (style === 'semi') {
            intro = `${headline}\n\n두 사람이 사랑으로 하나 되어\n새로운 시작을 함께합니다.\n\n귀한 걸음으로 축복해 주세요.`;
        } else {
            intro = `${headline}\n결혼식에 초대합니다.`;
        }
    } else if (data.eventType === 'dol') {
        headline = `${data.babyName} 돌잔치`;
        const parents = [data.dolFather, data.dolMother].filter(Boolean).join(' · ');
        const parentLine = parents ? `${parents}의 ${data.babyGender || '아이'} ` : '';
        if (style === 'formal') {
            intro = `${parentLine}${data.babyName}이(가)\n어느덧 첫 번째 생일을 맞이하게 되었습니다.\n\n아이의 건강한 성장을 기원하며\n작은 자리를 마련하였사오니\n귀한 걸음으로 축복해 주시면 감사하겠습니다.`;
        } else if (style === 'semi') {
            intro = `우리 ${data.babyName}${data.babyGender ? '(' + data.babyGender + ')' : ''}가\n벌써 첫돌을 맞이합니다.\n\n작은 자리 마련했으니\n따뜻한 축복 부탁드립니다.`;
        } else {
            intro = `${data.babyName} 돌잔치에 초대합니다.`;
        }
    } else if (data.eventType === 'hwangap' || data.eventType === 'chilsun' || data.eventType === 'palsun') {
        const label = data.eventType === 'hwangap' ? '회갑' : data.eventType === 'chilsun' ? '칠순' : '팔순';
        const g = data.elderGender || '';
        headline = `${data.elderName}${g ? ' ' + g : ''} ${label}연`;
        const hostLine = data.elderHosts ? `\n\n모시는 자녀: ${data.elderHosts}` : '';
        if (style === 'formal') {
            intro = `${data.elderName}${g ? ' ' + g : ''}께서\n${label}을(를) 맞이하시기에\n조촐한 자리를 마련하였사오니\n귀한 걸음으로 자리를 빛내 주시면\n감사하겠습니다.${hostLine}`;
        } else if (style === 'semi') {
            intro = `${data.elderName}${g ? ' ' + g : ''}의 ${label}을(를) 맞아\n가족이 한자리에 모입니다.\n\n따뜻한 축복으로 함께해 주세요.${hostLine}`;
        } else {
            intro = `${data.elderName}${g ? ' ' + g : ''} ${label}연에 초대합니다.${hostLine}`;
        }
    } else if (data.eventType === 'opening') {
        headline = `${data.shopName} 개업식`;
        const ceoLine = data.shopCeo ? `대표 ${data.shopCeo}` : '';
        if (style === 'formal') {
            intro = `${ceoLine ? ceoLine + '\n\n' : ''}새로운 보금자리에서\n${data.shopName}${data.shopType ? '(' + data.shopType + ')' : ''}이(가)\n첫 걸음을 시작합니다.\n\n귀한 걸음으로 앞날을 축복해 주시면\n큰 힘이 되겠습니다.`;
        } else if (style === 'semi') {
            intro = `${data.shopName}${data.shopType ? ' (' + data.shopType + ')' : ''} 오픈!\n\n새로운 시작을 응원해 주시고\n축복된 걸음으로 함께해 주세요.${ceoLine ? '\n\n' + ceoLine + ' 드림' : ''}`;
        } else {
            intro = `${data.shopName} 개업을 축하해 주세요!`;
        }
    }

    const venueLabel = EVENT_CONFIG[data.eventType].venueLabel;

    if (style === 'formal') {
        return `[${config.title}]

${intro}

${venueLabel}: ${data.venueName}${roomText}
일  시: ${dateText}${timeText}${afterPartyText}${addressText}${phoneText}${additional}${accountText}`;
    }

    if (style === 'semi') {
        return `[${config.label} 초대]

${intro}

${venueLabel}: ${data.venueName}${roomText}
일시: ${dateText}${timeText}${afterPartyText}${addressText}${phoneText}${additional}${accountText}`;
    }

    // simple
    return `[${config.label}] ${headline}
${venueLabel}: ${data.venueName}${roomText}
일시: ${dateText}${timeText}${afterPartyText}${data.additionalMessage ? '\n' + data.additionalMessage : ''}${accountText}`;
}

// ===== 미리보기 생성 =====
function generatePreview() {
    const data = getFormData();
    const config = EVENT_CONFIG[data.eventType];
    const message = generateMessage(data, data.messageStyle);

    // 헤더
    document.getElementById('previewEventIcon').textContent = config.icon;
    document.getElementById('previewEventTitle').textContent = config.title;
    document.getElementById('previewClosing').textContent = config.closing;

    // 카드 미리보기
    document.getElementById('previewContent').innerHTML = generatePreviewHTML(data);

    // SMS 미리보기
    document.getElementById('smsPreview').textContent = message;
}

function generatePreviewHTML(data) {
    const config = EVENT_CONFIG[data.eventType];
    const roomText = data.venueRoom ? ` ${data.venueRoom}` : '';
    const timeText = data.eventTime ? ` ${formatTime(data.eventTime)}` : '';
    const headline = getSubjectHeadline(data);

    let html = `<div style="text-align:center; margin-bottom:16px;">
<div style="font-size:18px; font-weight:700; color:var(--primary); margin-bottom:6px;">${escapeHtml(headline)}</div>`;

    // 이벤트별 추가 정보
    if (data.eventType === 'wedding') {
        if (data.groomParents || data.brideParents) {
            html += `<div style="font-size:12px; color:var(--text-light); margin-top:4px;">`;
            if (data.groomParents) html += `${escapeHtml(data.groomParents)}의 ${data.groomRelation || '아들'}<br>`;
            if (data.brideParents) html += `${escapeHtml(data.brideParents)}의 ${data.brideRelation || '딸'}`;
            html += `</div>`;
        }
    } else if (data.eventType === 'dol') {
        if (data.babyBirth) html += `<div style="font-size:12px; color:var(--text-light); margin-top:4px;">생년월일: ${formatDate(data.babyBirth)}</div>`;
        const parents = [data.dolFather, data.dolMother].filter(Boolean).join(' · ');
        if (parents) html += `<div style="font-size:12px; color:var(--text-light);">부모: ${escapeHtml(parents)}</div>`;
    } else if (data.eventType === 'hwangap' || data.eventType === 'chilsun' || data.eventType === 'palsun') {
        if (data.elderAge) html += `<div style="font-size:13px; color:var(--text-light); margin-top:4px;">${escapeHtml(data.elderAge)}세</div>`;
        if (data.elderHosts) html += `<div style="font-size:12px; color:var(--text-light); margin-top:4px;">모시는 자녀: ${escapeHtml(data.elderHosts)}</div>`;
    } else if (data.eventType === 'opening') {
        if (data.shopCeo) html += `<div style="font-size:13px; color:var(--text-light); margin-top:4px;">대표 ${escapeHtml(data.shopCeo)}</div>`;
        if (data.shopType) html += `<div style="font-size:12px; color:var(--text-light);">${escapeHtml(data.shopType)}</div>`;
    }

    html += `</div>

<div style="padding: 12px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin: 12px 0;">`;

    const venueLabel = config.venueLabel;
    html += `<strong>${venueLabel}</strong>  ${escapeHtml(data.venueName)}${escapeHtml(roomText)}
<strong>${config.dateLabel}</strong>  ${formatDate(data.eventDate)}${escapeHtml(timeText)}`;

    if (config.afterParty && data.afterParty) {
        html += `\n<strong>피로연</strong>  ${escapeHtml(data.afterParty)}`;
    }
    if (data.venueAddress) {
        html += `\n<strong>주  소</strong>  ${escapeHtml(data.venueAddress)}`;
    }
    if (data.venuePhone) {
        html += `\n<strong>연락처</strong>  ${escapeHtml(data.venuePhone)}`;
    }
    html += `</div>`;

    if (data.additionalMessage) {
        html += `<div style="margin-top:12px; padding-top:12px; border-top:1px solid var(--border); font-size:13px; color:var(--text-light); white-space:pre-line;">${escapeHtml(data.additionalMessage)}</div>`;
    }

    if (data.accounts && data.accounts.length > 0) {
        html += `<div style="margin-top:12px; padding-top:12px; border-top:1px solid var(--border);">
<strong>마음 전하는 곳</strong>
${data.accounts.map(a => {
    const rel = a.relation ? `<span style="color:var(--primary-dark); font-weight:600;">${escapeHtml(a.relation)}</span> ` : '';
    return `${rel}${escapeHtml(a.holder)}\n${escapeHtml(a.bank)} ${escapeHtml(a.number)}`;
}).join('\n\n')}</div>`;
    }

    return html;
}

// ===== 공유 데이터 생성 =====
async function generateShareData() {
    const data = getFormData();
    const baseUrl = window.location.origin + window.location.pathname;

    if (typeof saveCelebrationData === 'function') {
        const shortId = await saveCelebrationData(data);
        if (shortId) {
            const shareUrl = `${baseUrl}?id=${shortId}`;
            document.getElementById('shareUrl').value = shareUrl;
            generateQR(shareUrl);

            const headline = getSubjectHeadline(data);
            sendDiscordNotification({
                title: '🎉 새 축하 초대장 등록',
                fields: [
                    { name: '종류', value: EVENT_CONFIG[data.eventType].label },
                    { name: '주인공', value: headline || '-' },
                    { name: '장소', value: `${data.venueName} ${data.venueRoom || ''}` },
                    { name: '일시', value: `${data.eventDate} ${data.eventTime || ''}` },
                    { name: '초대장 링크', value: shareUrl }
                ]
            });

            if (navigator.share) {
                document.getElementById('nativeShareBtn').style.display = 'flex';
            }
            return;
        }
    }

    // Firebase 실패 시 해시 방식
    const encoded = encodeFormData(data);
    const shareUrl = `${baseUrl}#celebration=${encoded}`;
    document.getElementById('shareUrl').value = shareUrl;
    generateQR(shareUrl);

    if (navigator.share) {
        document.getElementById('nativeShareBtn').style.display = 'flex';
    }
}

function encodeFormData(data) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}

function decodeFormData(encoded) {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
}

// ===== QR 코드 =====
function generateQR(url) {
    const container = document.getElementById('qrCode');
    container.innerHTML = '';
    const div = document.createElement('div');
    div.style.cssText = 'padding:20px; text-align:center; color:var(--text-light); font-size:13px;';
    div.innerHTML = `
        <div style="width:160px; height:160px; margin:0 auto 12px; background:#fff5f7; border-radius:12px; display:flex; align-items:center; justify-content:center;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}"
                 alt="QR코드" width="140" height="140" style="border-radius:8px;"
                 onerror="this.parentElement.innerHTML='<span style=font-size:40px>📱</span><br><span style=font-size:11px>QR 생성 불가</span>'">
        </div>
        <p>QR코드를 스캔하면 초대장 페이지로 이동합니다</p>
    `;
    container.appendChild(div);
}

// ===== 공유 =====
function getShareMessage() {
    const data = getFormData();
    return generateMessage(data, data.messageStyle);
}

function shareKakao() {
    const textToShare = getShareMessage();
    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
        if (navigator.share) {
            navigator.share({
                title: '축하 초대장',
                text: textToShare,
            }).catch(() => {
                copyToClipboard(textToShare);
                showToast('카카오톡에 붙여넣기 해주세요');
            });
        } else {
            copyToClipboard(textToShare);
            showToast('내용이 복사되었습니다. 카카오톡에 붙여넣기 해주세요');
        }
    } else {
        copyToClipboard(textToShare);
        showToast('내용이 복사되었습니다. 카카오톡에 붙여넣기 해주세요');
    }
}

function shareSMS() {
    const message = getShareMessage();
    const shareUrl = document.getElementById('shareUrl').value;
    const fullMessage = message + '\n\n▶ 초대장 페이지: ' + shareUrl;

    const smsUrl = /iPhone|iPad/i.test(navigator.userAgent)
        ? `sms:&body=${encodeURIComponent(fullMessage)}`
        : `sms:?body=${encodeURIComponent(fullMessage)}`;

    window.location.href = smsUrl;
}

function copyMessage() {
    const message = getShareMessage();
    const shareUrl = document.getElementById('shareUrl').value;
    copyToClipboard(message + '\n\n▶ 초대장 페이지: ' + shareUrl);
    showToast('초대장 문자가 복사되었습니다');
}

function shareLink() {
    const shareUrl = document.getElementById('shareUrl').value;
    copyToClipboard(shareUrl);
    showToast('링크가 복사되었습니다');
}

function copyLink() {
    const shareUrl = document.getElementById('shareUrl').value;
    copyToClipboard(shareUrl);
    showToast('링크가 복사되었습니다');
}

function shareNative() {
    const message = getShareMessage();
    const shareUrl = document.getElementById('shareUrl').value;

    navigator.share({
        title: '축하 초대장',
        text: message,
        url: shareUrl,
    }).catch(() => {});
}

// ===== 클립보드 =====
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;opacity:0;';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// ===== 토스트 =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== 폼 초기화 =====
function resetForm() {
    ['groomName','brideName','groomParents','brideParents','babyName','babyBirth','dolFather','dolMother',
     'elderName','elderAge','elderHosts','shopName','shopCeo','shopType',
     'venueName','venueRoom','eventDate','venueAddress','venuePhone','afterParty','additionalMessage'
    ].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });

    document.getElementById('eventTime').value = '11:00';
    document.getElementById('messageStyle').value = 'semi';
    document.getElementById('babyGender').value = '';
    document.getElementById('elderGender').value = '';
    document.getElementById('groomRelation').value = '장남';
    document.getElementById('brideRelation').value = '장녀';
    ['groomRelationCustom', 'brideRelationCustom'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.value = ''; el.style.display = 'none'; }
    });

    const accountList = document.getElementById('accountList');
    accountList.innerHTML = `
        <div class="account-item">
            <div class="form-group account-relation-group">
                <label>관계</label>
                <select class="accountRelation" onchange="toggleAccountRelationCustom(this)">${getRelationOptionsHTML(currentEventType)}</select>
                <input type="text" class="accountRelationCustom" placeholder="관계를 직접 입력하세요" style="display:none; margin-top:6px;">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>은행</label>
                    <select class="accountBank">
                        <option value="">선택</option>
                        <option value="국민은행">국민은행</option>
                        <option value="신한은행">신한은행</option>
                        <option value="하나은행">하나은행</option>
                        <option value="우리은행">우리은행</option>
                        <option value="NH농협">NH농협</option>
                        <option value="IBK기업">IBK기업</option>
                        <option value="카카오뱅크">카카오뱅크</option>
                        <option value="토스뱅크">토스뱅크</option>
                        <option value="케이뱅크">케이뱅크</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>예금주</label>
                    <input type="text" class="accountHolder" placeholder="예: 홍길동 (선택)">
                </div>
            </div>
            <div class="form-group">
                <label>계좌번호</label>
                <input type="text" class="accountNumber" placeholder="예: 123-456-789012 (선택)">
            </div>
        </div>
    `;

    selectEventType('wedding');
    goToStep(1);
    showToast('초기화되었습니다');
}

// ===== 초대장 페이지 렌더링 (공유 링크 열었을 때) =====
function renderCelebrationPage(data) {
    const config = EVENT_CONFIG[data.eventType] || EVENT_CONFIG.wedding;

    document.querySelector('.header').style.display = 'none';
    document.querySelector('.step-indicator').style.display = 'none';
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';

    const page = document.getElementById('funeralPage');
    page.style.display = 'block';
    page.classList.add('active');

    // 헤더
    document.getElementById('fpEventIcon').textContent = config.icon;
    document.getElementById('fpTitle').textContent = config.title;
    document.getElementById('fpClosing').textContent = config.closing;
    document.getElementById('fpWreathTitle').textContent = '축하화환 마음 전하기';

    const roomText = data.venueRoom ? ` ${data.venueRoom}` : '';
    const timeText = data.eventTime ? ` ${formatTime(data.eventTime)}` : '';
    const headline = getSubjectHeadline(data);

    let body = `<div class="fp-deceased-name">${escapeHtml(headline)}</div>`;

    // 이벤트별 부가 정보
    if (data.eventType === 'wedding') {
        if (data.groomParents || data.brideParents) {
            body += `<div class="fp-subheader">`;
            if (data.groomParents) body += `${escapeHtml(data.groomParents)}의 ${data.groomRelation || '아들'} ${escapeHtml(data.groomName)}\n`;
            if (data.brideParents) body += `${escapeHtml(data.brideParents)}의 ${data.brideRelation || '딸'} ${escapeHtml(data.brideName)}`;
            body += `</div>`;
        }
    } else if (data.eventType === 'dol') {
        if (data.babyBirth) body += `<div class="fp-subheader">생년월일 ${formatDate(data.babyBirth)}</div>`;
        const parents = [data.dolFather, data.dolMother].filter(Boolean).join(' · ');
        if (parents) body += `<div class="fp-subheader">부모 ${escapeHtml(parents)}</div>`;
    } else if (data.eventType === 'hwangap' || data.eventType === 'chilsun' || data.eventType === 'palsun') {
        if (data.elderAge) body += `<div class="fp-subheader">${escapeHtml(data.elderAge)}세</div>`;
        if (data.elderHosts) body += `<div class="fp-subheader">모시는 자녀 · ${escapeHtml(data.elderHosts)}</div>`;
    } else if (data.eventType === 'opening') {
        if (data.shopCeo) body += `<div class="fp-subheader">대표 ${escapeHtml(data.shopCeo)}</div>`;
        if (data.shopType) body += `<div class="fp-subheader">${escapeHtml(data.shopType)}</div>`;
    }

    body += `\n\n━━━\n\n${config.venueLabel}\n${escapeHtml(data.venueName)}${escapeHtml(roomText)}\n\n${config.dateLabel}\n${formatDate(data.eventDate)}${escapeHtml(timeText)}`;

    if (config.afterParty && data.afterParty) {
        body += `\n\n피로연\n${escapeHtml(data.afterParty)}`;
    }
    if (data.venueAddress) {
        body += `\n\n주 소\n${escapeHtml(data.venueAddress)}`;
    }
    if (data.venuePhone) {
        body += `\n\n연 락 처\n${escapeHtml(data.venuePhone)}`;
    }
    if (data.additionalMessage) {
        body += `\n\n━━━\n\n${escapeHtml(data.additionalMessage)}`;
    }
    if (data.accounts && data.accounts.length > 0) {
        body += `\n\n━━━\n\n마음 전하는 곳\n\n${data.accounts.map(a => {
            const rel = a.relation ? `${escapeHtml(a.relation)} ` : '';
            return `${rel}${escapeHtml(a.holder)}\n${escapeHtml(a.bank)} ${escapeHtml(a.number)}`;
        }).join('\n\n')}`;
    }

    document.getElementById('fpBody').innerHTML = body;

    // 지도 & 길찾기
    if (data.venueAddress) {
        const mapContainer = document.getElementById('fpMap');
        const query = encodeURIComponent(data.venueAddress);
        mapContainer.innerHTML = `
            <iframe
                src="https://maps.google.com/maps?q=${query}&output=embed&hl=ko"
                width="100%"
                height="250"
                style="border:0; border-radius:12px;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            <div class="fp-address-row">
                <span class="fp-address-text">${escapeHtml(data.venueAddress)}</span>
                <button class="fp-copy-addr-btn" onclick="copyToClipboard('${data.venueAddress.replace(/'/g, "\\'")}'); showToast('주소가 복사되었습니다');">주소복사</button>
            </div>
        `;

        const navBtns = document.getElementById('fpNavBtns');
        navBtns.style.display = 'flex';
        document.getElementById('fpNavBtnKakao').onclick = () => {
            window.open(`https://map.kakao.com/link/search/${encodeURIComponent(data.venueAddress)}`, '_blank');
        };
        document.getElementById('fpNavBtnNaver').onclick = () => {
            window.open(`https://map.naver.com/v5/search/${encodeURIComponent(data.venueAddress)}`, '_blank');
        };
    }

    currentCelebrationData = data;
    currentCelebrationId = getCelebrationId();

    document.getElementById('fpCondolenceSection').style.display = 'block';
    loadCondolences();

    document.getElementById('fpWreathSection').style.display = 'block';
    loadWreathSenders();
}

// ===== 현재 초대장 ID =====
let currentCelebrationId = null;
let currentCelebrationData = null;

function getCelebrationId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || window.location.hash.replace('#celebration=', '').substring(0, 10);
}

// ===== 축하 메시지 =====
async function loadCondolences() {
    if (!currentCelebrationId || typeof db === 'undefined') return;

    const listEl = document.getElementById('fpCondolenceList');

    try {
        const snapshot = await db.collection(COLLECTION_NAME).doc(currentCelebrationId)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();

        if (snapshot.empty) {
            listEl.innerHTML = '<div class="fp-condolence-empty">아직 축하 메시지가 없습니다.</div>';
            return;
        }

        listEl.innerHTML = '';
        snapshot.forEach(doc => {
            const d = doc.data();
            const time = d.createdAt ? formatCondolenceTime(d.createdAt.toDate()) : '';
            const item = document.createElement('div');
            item.className = 'fp-condolence-item';
            item.innerHTML = `
                <div class="name">${escapeHtml(d.name)}</div>
                <div class="msg">${escapeHtml(d.message)}</div>
                <div class="time">${time}</div>
            `;
            listEl.appendChild(item);
        });
    } catch (error) {
        listEl.innerHTML = '<div class="fp-condolence-empty">메시지를 불러올 수 없습니다.</div>';
    }
}

function formatCondolenceTime(date) {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${m}/${d} ${h}:${min}`;
}

function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function submitCondolence() {
    const name = document.getElementById('fpCondolenceName').value.trim();
    const message = document.getElementById('fpCondolenceMsg').value.trim();

    if (!name) { showToast('이름을 입력해 주세요'); return; }
    if (!message) { showToast('메시지를 입력해 주세요'); return; }
    if (!currentCelebrationId || typeof db === 'undefined') {
        showToast('메시지를 저장할 수 없습니다');
        return;
    }

    try {
        await db.collection(COLLECTION_NAME).doc(currentCelebrationId)
            .collection('messages')
            .add({
                name: name,
                message: message,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

        sendDiscordNotification({
            title: '🎉 축하 메시지',
            fields: [
                { name: '이름', value: name },
                { name: '메시지', value: message },
                { name: '초대장 ID', value: currentCelebrationId || '-' }
            ]
        });

        document.getElementById('fpCondolenceName').value = '';
        document.getElementById('fpCondolenceMsg').value = '';
        showToast('축하 메시지가 등록되었습니다');
        loadCondolences();
    } catch (error) {
        showToast('등록에 실패했습니다. 다시 시도해 주세요');
    }
}

// ===== 축하화환 =====
let selectedWreath = null;
let selectedWreathPrice = null;

function openWreathModal() {
    document.getElementById('wreathModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    selectedWreath = null;
    document.querySelectorAll('.wreath-item').forEach(i => i.classList.remove('selected'));
    document.getElementById('wreathForm').style.display = 'none';
}

function closeWreathModal() {
    document.getElementById('wreathModal').style.display = 'none';
    document.body.style.overflow = '';
}

function selectWreath(el, name, price) {
    document.querySelectorAll('.wreath-item').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');
    selectedWreath = name;
    selectedWreathPrice = price;

    const priceText = price ? price.toLocaleString() + '원' : '';
    document.getElementById('wreathSelectedInfo').textContent = `선택: ${name} / ${priceText}`;
    document.getElementById('wreathPaymentAmount').textContent = `결제 금액: ${priceText}`;
    document.getElementById('wreathForm').style.display = 'block';

    if (currentCelebrationData) {
        document.getElementById('wreathDeliveryHall').value = (currentCelebrationData.venueName || '') + ' ' + (currentCelebrationData.venueRoom || '');
        document.getElementById('wreathDeliveryAddr').value = currentCelebrationData.venueAddress || '';
    }

    document.getElementById('wreathForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleRibbonSuggest() {
    const list = document.getElementById('ribbonSuggestList');
    list.style.display = list.style.display === 'none' ? 'block' : 'none';
}

function selectRibbon(text) {
    document.getElementById('wreathRibbonTop').value = text;
    document.getElementById('ribbonSuggestList').style.display = 'none';
}

function ribbonDirectInput() {
    document.getElementById('ribbonSuggestList').style.display = 'none';
    const input = document.getElementById('wreathRibbonTop');
    input.value = '';
    input.placeholder = '원하는 경축 문구를 입력하세요';
    input.focus();
}

function toggleReceipt(type) {
    document.getElementById('receiptCash').style.display = type === 'cash' ? 'block' : 'none';
    document.getElementById('receiptTax').style.display = type === 'tax' ? 'block' : 'none';
}

async function submitWreath() {
    const receiverName = document.getElementById('wreathSenderName').value.trim();
    const receiverPhone = document.getElementById('wreathSenderPhone').value.trim();
    const orderName = document.getElementById('wreathOrderName').value.trim();
    const orderPhone = document.getElementById('wreathOrderPhone').value.trim();
    const ribbonTop = document.getElementById('wreathRibbonTop').value.trim();
    const fromName = document.getElementById('wreathFromName').value.trim();
    const agree = document.getElementById('wreathAgree').checked;

    const defaultRibbon = currentCelebrationData ? (EVENT_CONFIG[currentCelebrationData.eventType] || {}).defaultRibbon : '축하드립니다';
    const ribbon = ribbonTop || defaultRibbon || '축하드립니다';

    if (!selectedWreath) { showToast('화환을 선택해 주세요'); return; }
    if (!orderName) { showToast('주문자 성함을 입력해 주세요'); return; }
    if (!receiverName) { showToast('받는분 성함을 입력해 주세요'); return; }
    if (!receiverPhone) { showToast('받는분 연락처를 입력해 주세요'); return; }
    if (!fromName) { showToast('보내는 분을 입력해 주세요'); return; }
    if (!agree) { showToast('개인정보 수집 및 이용에 동의해 주세요'); return; }

    if (!currentCelebrationId || typeof db === 'undefined') {
        showToast('접수할 수 없습니다');
        return;
    }

    const receiptType = document.querySelector('input[name="receipt"]:checked').value;
    let receiptInfo = { type: receiptType };
    if (receiptType === 'cash') {
        receiptInfo.phone = document.getElementById('receiptPhone').value.trim();
    } else if (receiptType === 'tax') {
        receiptInfo.email = document.getElementById('taxEmail').value.trim();
        receiptInfo.company = document.getElementById('taxCompany').value.trim();
        receiptInfo.ceo = document.getElementById('taxCeo').value.trim();
        receiptInfo.bizNo = document.getElementById('taxBizNo').value.trim();
        receiptInfo.addr = document.getElementById('taxAddr').value.trim();
        receiptInfo.bizType = document.getElementById('taxBizType').value.trim();
        receiptInfo.bizItem = document.getElementById('taxBizItem').value.trim();
    }

    try {
        await db.collection(COLLECTION_NAME).doc(currentCelebrationId)
            .collection('wreaths')
            .add({
                wreath: selectedWreath,
                price: selectedWreathPrice,
                orderName: orderName,
                orderPhone: orderPhone,
                senderName: receiverName,
                senderPhone: receiverPhone,
                ribbon: ribbon,
                fromName: fromName,
                receipt: receiptInfo,
                deliveryHall: document.getElementById('wreathDeliveryHall').value,
                deliveryAddr: document.getElementById('wreathDeliveryAddr').value,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

        sendDiscordNotification({
            title: '💐 축하화환 주문 접수',
            fields: [
                { name: '화환', value: selectedWreath },
                { name: '금액', value: selectedWreathPrice ? selectedWreathPrice.toLocaleString() + '원' : '-' },
                { name: '주문자', value: orderName || '-' },
                { name: '주문자 연락처', value: orderPhone || '-' },
                { name: '받는분', value: receiverName },
                { name: '받는분 연락처', value: receiverPhone },
                { name: '리본 문구', value: ribbon },
                { name: '보내는 분', value: fromName || '-' },
                { name: '배송지', value: document.getElementById('wreathDeliveryHall').value || '-' },
                { name: '증빙', value: receiptType === 'none' ? '신청안함' : receiptType },
                { name: '초대장 ID', value: currentCelebrationId || '-' }
            ]
        });

        showToast('주문이 완료되었습니다');
        closeWreathModal();
        document.getElementById('wreathOrderName').value = '';
        document.getElementById('wreathOrderPhone').value = '';
        document.getElementById('wreathSenderName').value = '';
        document.getElementById('wreathSenderPhone').value = '';
        document.getElementById('wreathRibbonTop').value = '';
        document.getElementById('wreathFromName').value = '';
        document.getElementById('wreathAgree').checked = false;
        loadWreathSenders();
    } catch (error) {
        showToast('접수에 실패했습니다. 다시 시도해 주세요');
    }
}

// ===== 화환 보내신 분 =====
async function loadWreathSenders() {
    if (!currentCelebrationId || typeof db === 'undefined') return;

    const listEl = document.getElementById('fpWreathSenderList');

    try {
        const snapshot = await db.collection(COLLECTION_NAME).doc(currentCelebrationId)
            .collection('wreaths')
            .orderBy('createdAt', 'desc')
            .get();

        if (snapshot.empty) {
            listEl.innerHTML = '';
            return;
        }

        let html = '<div class="fp-wreath-sender-title">축하화환 보내신 분</div>';

        snapshot.forEach(doc => {
            const d = doc.data();
            const date = d.createdAt ? formatCondolenceTime(d.createdAt.toDate()) : '';
            html += `
                <div class="fp-wreath-sender-item">
                    <div>
                        <div class="fp-wreath-sender-name">${escapeHtml(d.senderName)} - ${escapeHtml(d.wreath)}</div>
                        <div class="fp-wreath-sender-ribbon">${escapeHtml(d.ribbon || '축하드립니다')}</div>
                    </div>
                    <div class="fp-wreath-sender-date">${date}</div>
                </div>`;
        });

        listEl.innerHTML = html;
    } catch (e) {
        // 조용히 실패
    }
}

// ===== 감사장 =====
const replyTemplates = {
    wedding: `따뜻한 마음으로 저희 두 사람의
결혼을 축복해 주시어 진심으로 감사드립니다.
베풀어 주신 사랑을 가슴 깊이 새기며
서로 아끼고 사랑하는 부부가 되겠습니다.
늘 행복하시고 건강하시기를 기원합니다.`,
    dol: `바쁘신 중에도 우리 아이의
첫 번째 생일을 축하해 주시어
진심으로 감사드립니다.
베풀어 주신 사랑과 축복에 힘입어
바르고 건강하게 자라도록 정성을 다하겠습니다.`,
    elder: `귀한 걸음으로 뜻깊은 자리를
함께해 주시어 진심으로 감사드립니다.
베풀어 주신 따뜻한 마음을
오래도록 간직하겠습니다.
늘 건강하시고 행복하시기를 기원합니다.`,
    opening: `저희의 새로운 시작을
축하하고 응원해 주시어
진심으로 감사드립니다.
베풀어 주신 성원에 힘입어
고객 여러분께 더 큰 가치로
보답하는 모습으로 나아가겠습니다.`
};

let selectedReplyType = null;
let selectedReplyText = '';

function openReplyModal() {
    document.getElementById('replyModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    selectedReplyType = null;
    selectedReplyText = '';
    document.querySelectorAll('.reply-option').forEach(o => o.classList.remove('selected'));
    document.getElementById('replyPreview').style.display = 'none';
    document.getElementById('replyShareBtns').style.display = 'none';
}

function closeReplyModal() {
    document.getElementById('replyModal').style.display = 'none';
    document.body.style.overflow = '';
}

function selectReply(el, type) {
    document.querySelectorAll('.reply-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    selectedReplyType = type;

    const data = getFormData();
    const headline = getSubjectHeadline(data) || '';

    selectedReplyText = `[감사 인사]\n\n${replyTemplates[type]}\n\n${headline} 드림`;

    document.getElementById('replyPreviewText').value = selectedReplyText;
    document.getElementById('replyPreview').style.display = 'block';
    document.getElementById('replyShareBtns').style.display = 'block';

    if (navigator.share) {
        document.getElementById('replyNativeShareBtn').style.display = 'flex';
    }

    const baseUrl = window.location.origin + window.location.pathname;
    const replyUrl = `${baseUrl}#reply=${btoa(unescape(encodeURIComponent(selectedReplyText)))}`;
    const qrContainer = document.getElementById('replyQrCode');
    qrContainer.innerHTML = `
        <div style="width:160px; height:160px; margin:0 auto 12px; background:#fff5f7; border-radius:12px; display:flex; align-items:center; justify-content:center;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(replyUrl)}"
                 alt="QR코드" width="140" height="140" style="border-radius:8px;"
                 onerror="this.parentElement.innerHTML='<span style=font-size:40px>📱</span><br><span style=font-size:11px>QR 생성 불가</span>'">
        </div>
    `;

    document.getElementById('replyPreview').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function shareReplyKakao() {
    if (navigator.share) {
        navigator.share({ title: '감사 인사', text: selectedReplyText }).catch(() => {
            copyToClipboard(selectedReplyText);
            showToast('내용이 복사되었습니다. 카카오톡에 붙여넣기 해주세요');
        });
    } else {
        copyToClipboard(selectedReplyText);
        showToast('내용이 복사되었습니다. 카카오톡에 붙여넣기 해주세요');
    }
}

function shareReplySMS() {
    const smsUrl = /iPhone|iPad/i.test(navigator.userAgent)
        ? `sms:&body=${encodeURIComponent(selectedReplyText)}`
        : `sms:?body=${encodeURIComponent(selectedReplyText)}`;
    window.location.href = smsUrl;
}

function copyReplyMessage() {
    copyToClipboard(selectedReplyText);
    showToast('감사장이 복사되었습니다');
}

function shareReplyLink() {
    const baseUrl = window.location.origin + window.location.pathname;
    const replyUrl = `${baseUrl}#reply=${btoa(unescape(encodeURIComponent(selectedReplyText)))}`;
    copyToClipboard(replyUrl);
    showToast('링크가 복사되었습니다');
}

function shareReplyNative() {
    navigator.share({ title: '감사 인사', text: selectedReplyText }).catch(() => {});
}

// ===== URL 체크 =====
async function checkUrl() {
    const params = new URLSearchParams(window.location.search);
    const shortId = params.get('id');
    if (shortId && typeof loadCelebrationData === 'function') {
        try {
            const data = await loadCelebrationData(shortId);
            if (data) {
                renderCelebrationPage(data);
                return;
            } else {
                showToast('만료되었거나 존재하지 않는 초대장입니다');
            }
        } catch (e) {
            console.error('초대장 데이터 로드 오류:', e);
        }
    }

    const hash = window.location.hash;
    if (hash.startsWith('#celebration=')) {
        try {
            const encoded = hash.replace('#celebration=', '');
            const data = decodeFormData(encoded);
            renderCelebrationPage(data);
        } catch (e) {
            console.error('초대장 데이터 파싱 오류:', e);
        }
    }
    // 호환: 예전 #funeral= 해시
    if (hash.startsWith('#funeral=')) {
        try {
            const encoded = hash.replace('#funeral=', '');
            const data = decodeFormData(encoded);
            renderCelebrationPage(data);
        } catch (e) {}
    }
}

function checkHash() { checkUrl(); }

// ===== PWA 설치 =====
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt();
});

function showInstallPrompt() {
    if (sessionStorage.getItem('installDismissed')) return;

    const prompt = document.createElement('div');
    prompt.className = 'install-prompt';
    prompt.innerHTML = `
        <p>📱 홈 화면에 추가하면 앱처럼 사용할 수 있어요</p>
        <button class="btn-install" onclick="installPWA()">설치</button>
        <button class="btn-dismiss" onclick="dismissInstall(this)">&times;</button>
    `;
    document.body.appendChild(prompt);
}

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
            const prompt = document.querySelector('.install-prompt');
            if (prompt) prompt.remove();
        });
    }
}

function dismissInstall(btn) {
    btn.closest('.install-prompt').remove();
    sessionStorage.setItem('installDismissed', 'true');
}

// ===== 서비스 워커 =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    });
}

// ===== 초기화 =====
window.addEventListener('load', () => {
    // 초기 계좌 관계 옵션 세팅 (기본: 결혼식)
    refreshAccountRelationSelects(currentEventType);

    checkUrl();

    // 기본 날짜 설정 (오늘 이후)
    const dateInput = document.getElementById('eventDate');
    if (dateInput) dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);

    if (typeof cleanupExpired === 'function') {
        cleanupExpired();
    }
});

window.addEventListener('hashchange', () => checkUrl());
