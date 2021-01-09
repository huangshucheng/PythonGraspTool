# -*- coding: utf-8 -*-

import sys
from PyQt5.QtWidgets import QApplication, QWidget,QMainWindow

from UI import MyMainWindow

class MyMainWindowEx(QMainWindow, MyMainWindow.Ui_MainWindow):
    def __init__(self, parent=None):
        super(MyMainWindowEx, self).__init__(parent)
        self.setupUi(self)
