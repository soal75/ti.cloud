windowFunctions['Show Photo'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    var content = Ti.UI.createScrollView({
        top: offset + u,
        contentHeight: 'auto',
        layout: 'vertical'
    });
    win.add(content);

    var status = Ti.UI.createLabel({
        text: 'Loading, please wait...', textAlign: 'left',
        height: 30 + u, left: 20 + u, right: 20 + u
    });
    content.add(status);

    Cloud.Photos.show({
        photo_id: evt.id
    }, function (e) {
        content.remove(status);

        var update = Ti.UI.createButton({
            title: 'Update Photo',
            top: 10 + u, left: 10 + u, right: 10 + u, bottom: 10 + u,
            height: 40 + u
        });
        update.addEventListener('click', function () {
            handleOpenWindow({ target: 'Update Photo', id: evt.id });
        });
        content.add(update);

        var remove = Ti.UI.createButton({
            title: 'Remove Photo',
            top: 10 + u, left: 10 + u, right: 10 + u, bottom: 10 + u,
            height: 40 + u
        });
        remove.addEventListener('click', function () {
            handleOpenWindow({ target: 'Remove Photo', id: evt.id });
        });
        content.add(remove);

        if (e.success) {
            enumerateProperties(content, e.photos[0], 20);
        }
        else {
            error(e);
        }
    });

    win.open();
};