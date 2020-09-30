var fileopensave = {
    /**
     * 
     * @returns {undefined}
     */
    OpenFile: function (callback, accept)
    {
        accept = (typeof (accept) !== 'undefined') ? accept : "text/*";
        if (document.getElementById("___files") === null)
        {
            var el = document.createElement('input');
            el.setAttribute('type', "file");
            el.setAttribute('id', "___files");
            el.setAttribute('name', "files[]");
            el.setAttribute('accept', accept);
            el.setAttribute('style', "display:none");
            document.getElementsByTagName('body')[0].appendChild(el);
            document.getElementById('___files').addEventListener('change', function (evt) {
                var files = evt.target.files; // FileList object
                if (!files.length) {
                    return;
                }
                fileopensave.Download.filename = escape(files[0].name);
                var reader = new FileReader();
                reader.onload = function (event)
                {
                    if (typeof (callback) !== 'undefined')
                        callback(event.target.result);
                };
                reader.readAsText(files[0], "UTF-8");
            }, false);
        }
        document.getElementById("___files").click();
    }
    ,

    /**
     * 
     * @param {type} data
     * @param {type} filename
     * @returns {undefined}
     */
    SaveAs: function (data, filename)
    {
        fileopensave.Download.save(data, filename);

    }
    ,
    Download: {
        filename: "file.txt",
        click: function (node) {
            var ev = document.createEvent("MouseEvents");
            ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            return node.dispatchEvent(ev);
        },
        encode: function (data) {
            return 'data:application/octet-stream;base64,' + btoa(data);
        },
        link: function (data, name) {
            var a = document.createElement('a');
            a.download = name || self.location.pathname.slice(self.location.pathname.lastIndexOf('/') + 1);
            a.href = data || self.location.href;
            return a;
        },

        save: function (data, name) {
            name = (typeof (name) !== 'undefined') ? name : fileopensave.Download.filename;
            this.click(
                    this.link(
                            this.encode(data),
                            name
                            )
                    );
        }
    }

};

