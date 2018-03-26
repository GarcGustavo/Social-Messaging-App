from DAO.users import userDAO
from flask import *


class UserHandler:

    def buildUserDict(self, row):
        users = {}
        users['uID'] = row[0]
        users['uFirstName'] = row[1]
        users['uLastName'] = row[2]
        users['uPhone'] = row[3]
        users['uEMail'] = row[4]
        return users

    def getUsers(self):
        dao = userDAO()
        users = dao.getUsers()
        user_list = []
        for row in users:
            result = self.buildUserDict(row)
            user_list.append(result)
        return jsonify(Users=user_list)
