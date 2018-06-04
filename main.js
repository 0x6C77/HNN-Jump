(() => {
    var commentSelector = 'table.comment-tree > tbody > tr',
        comments = document.querySelectorAll(commentSelector),
        documentTop = document.body.scrollTop;

    // Check this page has comments
    if (!comments.length) {
        return;
    }

    // Filter out non-parent comments
    var parents = [...comments].filter(element => {
        let indent = element.querySelector('.ind img');

        if (indent) {
            return !indent.offsetWidth;
        } else {
            return false;
        }
    });

    // Dont add arrow if there are less than three parent comments
    if (parents.length < 3) {
        return;
    }

    // Calculate tops for each parent comment
    var parentTops = parents.map(element =>
        documentTop + element.getBoundingClientRect().top
    );

    // Scroll to next comment
    var jump = () => {
        // Get current scroll position + 1 to get beyond current comment
        var scroll = document.body.scrollTop + 1;

        // Get next parent based on current scroll position
        var nextIndex = parentTops.findIndex(offset => offset > scroll);

        // Unhighlight other comments
        parents.forEach(element => {
            element.style.backgroundColor = '';
        });

        if (!parents[nextIndex]) {
            window.scrollTo(0, document.body.scrollHeight);
            return;
        }

        // Highlight and scroll to next comment
        parents[nextIndex].style.backgroundColor = '#FFFFFF';
        window.scrollTo(0, parentTops[nextIndex]);
    }

    // Add new HTML elements to page
    var arrow = document.createElement('button');
    arrow.classList.add('hnn-jump-arrow');
    arrow.addEventListener('click', jump);

    document.body.appendChild(arrow);
})()