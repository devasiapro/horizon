"""create contract status table

Revision ID: 0bdbd232cc22
Revises: 5609ad8eaf7a
Create Date: 2023-11-09 15:51:32.622651

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0bdbd232cc22'
down_revision: Union[str, None] = '5609ad8eaf7a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'contract_status',
        sa.Column('id', sa.Integer, primary_key = True, index = True),
        sa.Column('name', sa.String(128), nullable = False),
        sa.Column('description', sa.String(256), nullable = True)
    )

def downgrade() -> None:
    op.drop_table('contract_status')
